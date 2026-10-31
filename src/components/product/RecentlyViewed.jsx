"use client";

import { useEffect, useState } from "react";

import { products } from "@/data/products";
import ProductRec from "./ProductRec";

const STORAGE_KEY = "nuove-recently-viewed";

export default function RecentlyViewed({ currentHandle }) {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const history = Array.isArray(stored) ? stored : [];

      const previousHandles = history
        .filter((handle) => handle !== currentHandle)
        .slice(0, 4);

      setViewed(
        previousHandles
          .map((handle) =>
            products.find((product) => product.handle === handle)
          )
          .filter(Boolean)
      );

      const updated = [
        currentHandle,
        ...history.filter((handle) => handle !== currentHandle),
      ].slice(0, 8);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      setViewed([]);
    }
  }, [currentHandle]);

  if (!viewed.length) return null;

  return (
    <ProductRec
      title="Recently Viewed"
      subtitle="Continue Exploring"
      products={viewed}
    />
  );
}