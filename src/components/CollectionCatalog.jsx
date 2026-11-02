"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { collections } from "@/data/collections";

const concernLabels = {
  "hydrate-restore": "Hydrate & Restore",
  "firm-smooth": "Firm & Smooth",
  "brighten-revitalize": "Brighten & Revitalize",
  "calm-balance": "Calm & Balance",
};

const stepLabels = {
  cleanse: "Cleanse",
  serum: "Serum",
  treat: "Treat",
  moisturize: "Moisturize",
  protect: "Protect",
  "eye-care": "Eye Care",
  mask: "Mask",
  "night-treatment": "Night Treatment",
};

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();
const asArray = (value) =>
  Array.isArray(value) ? value : value ? [value] : [];

function getRoutineSteps(product) {
  return asArray(product.routineSteps ?? product.routineStep)
    .map(normalize)
    .filter(Boolean);
}

function getIngredients(product) {
  return asArray(product.keyIngredients)
    .map((ingredient) =>
      typeof ingredient === "string" ? ingredient : ingredient?.name,
    )
    .map(normalize)
    .filter(Boolean);
}

function FilterFields({
  options,
  selected,
  onToggle,
  maxPrice,
  priceLimit,
  onPriceChange,
  onClear,
  activeCount,
}) {
  const sections = [
    { title: "Skin Concern", key: "concerns" },
    { title: "Product Type", key: "categories" },
    { title: "Routine Step", key: "steps" },
    { title: "Key Ingredient", key: "ingredients" },
  ];

  return (
    <div className="space-y-7">
      {sections.map(({ title, key }, index) =>
        options[key].length > 0 ? (
          <FilterGroup key={key} title={title} defaultOpen={index === 0}>
            <div className="space-y-3">
              {options[key].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={selected[key].includes(value)}
                    onChange={() => onToggle(key, value)}
                    className="h-4 w-4 shrink-0 accent-[#06304A]"
                  />

                  <span className="text-primary/70 font-sans text-[14px] leading-[1.5]">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </FilterGroup>
        ) : null,
      )}

      {priceLimit > 0 && (
        <FilterGroup title="Price">
          <div className="text-primary/65 flex justify-between font-sans text-[14px]">
            <span>$0</span>
            <span>Up to ${maxPrice.toFixed(0)}</span>
          </div>

          <input
            type="range"
            min={0}
            max={priceLimit}
            step={1}
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label="Maximum product price"
            className="mt-4 w-full cursor-pointer accent-[#06304A]"
          />
        </FilterGroup>
      )}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-primary font-sans text-[14px] font-semibold underline underline-offset-4"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ title, children, defaultOpen = false }) {
  return (
    <details
      open={defaultOpen || undefined}
      className="group border-primary/10 border-b py-5"
    >
      <summary className="text-primary flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
        {title}

        <span className="text-primary flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4F6] transition-transform duration-300 group-open:rotate-180">
          <ChevronDown size={17} strokeWidth={1.5} />
        </span>
      </summary>

      <div className="pt-5">{children}</div>
    </details>
  );
}

export default function CollectionCatalog({ collection, products = [] }) {
  const [sortBy, setSortBy] = useState("featured");
  const [selected, setSelected] = useState({
    concerns: [],
    categories: [],
    steps: [],
    ingredients: [],
  });
  const [maxPriceSelection, setMaxPriceSelection] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeRef = useRef(null);
  const filterTriggerRef = useRef(null);

  const priceLimit = useMemo(
    () => Math.ceil(Math.max(0, ...products.map((p) => Number(p.price) || 0))),
    [products],
  );
  const maxPrice = Math.min(maxPriceSelection ?? priceLimit, priceLimit);

  const options = useMemo(() => {
    const concerns = [
      ...new Set(products.flatMap((p) => asArray(p.concerns))),
    ].filter(Boolean);
    const categories = [...new Set(products.map((p) => p.category))].filter(
      Boolean,
    );
    const steps = [...new Set(products.flatMap(getRoutineSteps))];
    const ingredients = [...new Set(products.flatMap(getIngredients))];
    const label = (value) =>
      value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      concerns: concerns
        .map((value) => ({
          value,
          label: concernLabels[value] || label(value),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      categories:
        categories.length > 1
          ? categories
              .map((value) => ({ value, label: value }))
              .sort((a, b) => a.label.localeCompare(b.label))
          : [],
      steps: steps
        .map((value) => ({ value, label: stepLabels[value] || label(value) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      ingredients: ingredients
        .map((value) => ({ value, label: label(value) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const match = (key, values) =>
        !selected[key].length ||
        selected[key].some((value) => values.includes(value));
      return (
        match("concerns", asArray(product.concerns)) &&
        match("categories", [product.category]) &&
        match("steps", getRoutineSteps(product)) &&
        match("ingredients", getIngredients(product)) &&
        Number(product.price) <= maxPrice
      );
    });
    return result.sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return (
        (a.featuredOrder ?? a.bestsellerOrder ?? 999) -
          (b.featuredOrder ?? b.bestsellerOrder ?? 999) ||
        a.name.localeCompare(b.name)
      );
    });
  }, [products, selected, maxPrice, sortBy]);

  const activeCount =
    Object.values(selected).reduce((sum, values) => sum + values.length, 0) +
    (maxPrice < priceLimit ? 1 : 0);
  function toggle(key, value) {
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  }
  function clear() {
    setSelected({ concerns: [], categories: [], steps: [], ingredients: [] });
    setMaxPriceSelection(null);
  }
  function closeDrawer() {
    setDrawerOpen(false);
  }

  useEffect(() => {
    if (!drawerOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKeys(event) {
      if (event.key === "Escape") closeDrawer();
      if (event.key !== "Tab") return;
      const dialog = document.getElementById("collection-filter-dialog");
      const focusables = [
        ...(dialog?.querySelectorAll(
          "button:not([disabled]), input:not([disabled]), a[href], select:not([disabled])",
        ) || []),
      ];
      if (!focusables.length) return;
      const first = focusables[0],
        last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeys);
      filterTriggerRef.current?.focus();
    };
  }, [drawerOpen]);

  const filterProps = {
    options,
    selected,
    onToggle: toggle,
    maxPrice,
    priceLimit,
    onPriceChange: setMaxPriceSelection,
    onClear: clear,
    activeCount,
  };

  return (
    <main>
      <section className="bg-[#f8f6f1] px-4 pt-28 pb-14 md:px-6 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-360">
          <nav
            aria-label="Breadcrumb"
            className="text-primary/55 mb-7 flex items-center gap-2 font-sans text-[13px]"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections/all" className="hover:text-primary">
              Shop
            </Link>
            {collection.slug !== "all" && (
              <>
                <span>/</span>
                <span className="text-primary">{collection.name}</span>
              </>
            )}
          </nav>

          <p className="font-sans text-[13px] font-medium tracking-[0.12em] text-[#6999AD] uppercase">
            {collection.eyebrow}
          </p>
          <h1 className="font-heading text-primary mt-5 text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.95] tracking-[-0.035em]">
            {collection.title}
          </h1>
          <p className="text-primary/65 mt-7 max-w-[600px] font-sans text-[16px] leading-[1.8] sm:text-[17px]">
            {collection.description}
          </p>
          <Link
            href="#collection-products"
            className="text-primary mt-8 inline-flex items-center gap-3 font-sans text-[15px] font-semibold"
          >
            Explore Products <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>

      <section
        id="collection-products"
        aria-labelledby="collection-products-heading"
        className="px-4 py-12 md:px-6 lg:py-16"
      >
        <div className="mx-auto max-w-360">
          <nav
            aria-label="Shop by category"
            className="mb-10 flex gap-2 overflow-x-auto pb-3"
          >
            {collections.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                aria-current={
                  collection.slug === item.slug ? "page" : undefined
                }
                className={`shrink-0 rounded-full px-5 py-3 font-sans text-[14px] font-medium transition-colors ${collection.slug === item.slug ? "bg-primary text-white" : "border-primary/10 text-primary border bg-[#F5F8F8] hover:bg-[#E8F2F5]"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-primary/10 mb-8 flex flex-wrap items-end justify-between gap-5 border-b pb-6">
            <div>
              <h2
                id="collection-products-heading"
                className="font-heading text-primary text-[clamp(2.2rem,3vw,3rem)]"
              >
                {collection.slug === "all"
                  ? "Shop All Products"
                  : collection.name}
              </h2>
              <p
                role="status"
                className="text-primary/55 mt-2 font-sans text-[14px]"
              >
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <button
                ref={filterTriggerRef}
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                className="border-primary/15 text-primary flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border px-4 font-sans text-[14px] font-medium lg:hidden"
              >
                <SlidersHorizontal size={17} /> Filters{" "}
                {activeCount > 0 ? `(${activeCount})` : ""}
              </button>
              <div className="relative min-w-0 flex-1 sm:flex-none">
                <label htmlFor="collection-sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="collection-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-primary/15 text-primary focus:border-primary min-h-12 w-full appearance-none rounded-full border bg-white py-2 pr-10 pl-5 font-sans text-[14px] font-medium outline-none sm:min-w-[200px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
                <ChevronDown
                  size={17}
                  className="text-primary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[245px_minmax(0,1fr)] xl:gap-12">
            <aside
              aria-label="Product filters"
              className="border-primary/10 sticky top-28 hidden max-h-[calc(100dvh-130px)] [scrollbar-width:thin] overflow-y-auto overscroll-contain rounded-[22px] border bg-[#FAFBFA] p-6 lg:block"
            >
              <div className="mb-7 flex items-center gap-2">
                <SlidersHorizontal size={19} className="text-primary" />
                <h3 className="text-primary font-sans text-[17px] font-semibold">
                  Filters
                </h3>
              </div>
              <FilterFields {...filterProps} />
            </aside>
            <div className="min-w-0">
              {filteredProducts.length ? (
                <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id ?? product.handle}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] bg-[#F6F8F8] px-6 text-center">
                  <h3 className="font-heading text-primary text-[32px]">
                    No products found.
                  </h3>
                  <p className="text-primary/60 mt-3 font-sans text-[15px]">
                    Try adjusting your filters.
                  </p>
                  <button
                    type="button"
                    onClick={clear}
                    className="bg-primary mt-6 rounded-full px-7 py-3 font-sans text-[14px] font-semibold text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Always mounted so the open/close transitions can run. */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden ${drawerOpen ? "visible" : "pointer-events-none invisible delay-500"}`}
      >
        <button
          type="button"
          aria-label="Close filters"
          tabIndex={drawerOpen ? 0 : -1}
          onClick={closeDrawer}
          className={`absolute inset-0 w-full bg-[#061E2B]/40 transition-opacity duration-500 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="collection-filter-dialog"
          role="dialog"
          aria-modal={drawerOpen ? "true" : undefined}
          aria-hidden={!drawerOpen}
          aria-label="Filter products"
          inert={!drawerOpen}
          className={`absolute inset-y-0 right-0 flex w-full max-w-[390px] flex-col bg-[#FCFCFB] shadow-[-20px_0_70px_rgba(6,48,74,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <header className="border-primary/10 flex shrink-0 items-center justify-between border-b px-6 py-5">
            <div>
              <p className="font-sans text-[12px] font-medium text-[#6999AD]">
                Refine Your Selection
              </p>
              <h2 className="font-heading text-primary mt-1 text-[32px]">
                Filter Products.
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeDrawer}
              aria-label="Close filters"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF4F5]"
            >
              <X size={20} />
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7">
            <FilterFields {...filterProps} />
          </div>
          <footer className="border-primary/10 shrink-0 border-t bg-white p-5">
            <button
              type="button"
              onClick={closeDrawer}
              className="bg-primary flex min-h-[56px] w-full items-center justify-between rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[15px] font-semibold text-white"
            >
              Show {filteredProducts.length} Products{" "}
              <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3]">
                <Check size={19} />
              </span>
            </button>
          </footer>
        </aside>
      </div>
    </main>
  );
}
