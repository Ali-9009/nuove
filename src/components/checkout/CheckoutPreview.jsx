'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, CreditCard, LockKeyhole, Minus, Plus, ShieldCheck, ShoppingBag, Tag, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const SHIPPING_THRESHOLD = 175; // Must remain unchanged until client approval.
const money = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount) || 0);

function Field({ label, name, type = 'text', required = false, autoComplete, placeholder, className = '' }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-2 block font-sans text-[12px] font-medium text-primary/70">{label}{required ? ' *' : ''}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="h-13 w-full rounded-2xl border border-primary/15 bg-white px-4 font-sans text-[14px] text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-[#6999AD] focus:ring-2 focus:ring-[#6999AD]/15"
      />
    </label>
  );
}

function OrderItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find((p) => p.handle === item.handle);
  const image = product?.image || item.image;
  return (
    <article className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 border-b border-primary/10 py-4 last:border-b-0 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
      <Link href={`/products/${item.handle}`} className="relative aspect-4/5 overflow-hidden rounded-[15px] bg-[#F0F6F7]">
        {image ? <Image src={image} alt={item.name} fill sizes="88px" className="object-contain p-1" /> : <ShoppingBag className="absolute inset-0 m-auto text-primary/20" />}
      </Link>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/products/${item.handle}`} className="line-clamp-2 font-sans text-[13px] font-semibold leading-relaxed text-primary hover:underline">{item.name}</Link>
          <span className="shrink-0 font-sans text-[13px] font-semibold text-primary">{money(item.price * item.quantity)}</span>
        </div>
        {item.variantLabel && <p className="mt-1 font-sans text-[12px] text-primary/55">{item.variantLabel}</p>}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-[#FAFCFC] px-2 py-1">
            <button aria-label={`Decrease ${item.name} quantity`} type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#E8F1F3]"><Minus size={14} /></button>
            <span className="w-4 text-center font-sans text-[12px] font-semibold text-primary">{item.quantity}</span>
            <button aria-label={`Increase ${item.name} quantity`} type="button" disabled={item.quantity >= 10} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#E8F1F3] disabled:opacity-30"><Plus size={14} /></button>
          </div>
          <button type="button" onClick={() => removeItem(item.key)} className="font-sans text-[12px] text-primary/50 underline underline-offset-4 hover:text-primary">Remove</button>
        </div>
      </div>
    </article>
  );
}

export default function CheckoutPreview() {
  const { items, count, subtotal, hydrated } = useCart();
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const reachedThreshold = remaining <= 0;
  const progress = Math.min(100, subtotal / SHIPPING_THRESHOLD * 100);

  return (
    <main className="min-h-svh bg-[#FAFBF9] pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-[12px] text-primary/50">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
          <Link href="/cart" className="hover:text-primary">Your Bag</Link><span>/</span>
          <span className="text-primary">Checkout</span>
        </nav>
        <header className="mt-8 border-b border-primary/10 pb-8 sm:mt-10 sm:pb-10">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6999AD]">NUOVÉ · Your Ritual</span>
          <h1 className="font-heading mt-3 text-[clamp(3.5rem,6vw,6.3rem)] leading-none tracking-[-0.04em] text-primary">Your <em>Checkout.</em></h1>
          <p className="mt-4 max-w-[680px] font-sans text-[14px] leading-relaxed text-primary/60 sm:text-[15px]">Review your selections in a calm, considered space. Secure payment will be available when the live checkout provider is connected.</p>
        </header>
        <div role="status" className="mt-7 flex items-start gap-3 rounded-[18px] border border-[#B9D5DC] bg-[#EDF6F8] px-4 py-4 font-sans text-[13px] leading-relaxed text-primary sm:px-6">
          <ShieldCheck size={19} className="mt-0.5 shrink-0" />
          <p><strong>Checkout preview.</strong> This page does not take payments, calculate final tax/shipping, validate discount codes, or place orders. Customer information entered here is not submitted.</p>
        </div>

        {!hydrated ? (
          <div className="py-20 font-sans text-primary/60">Loading your bag…</div>
        ) : !items.length ? (
          <section className="mx-auto mt-14 max-w-xl rounded-[30px] border border-primary/10 bg-white px-6 py-16 text-center shadow-[0_20px_50px_rgba(6,48,74,0.04)]">
            <ShoppingBag className="mx-auto text-[#6999AD]" size={38} strokeWidth={1.4}/>
            <h2 className="font-heading mt-5 text-[40px] text-primary">Your bag is empty.</h2>
            <p className="mt-2 font-sans text-[14px] text-primary/60">Explore the collection to begin your skincare ritual.</p>
            <Link href="/collections/all" className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-sans text-[13px] font-semibold text-white">Explore Products <ArrowUpRight size={17}/></Link>
          </section>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.85fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 space-y-6">
              <section className="rounded-[26px] border border-primary/10 bg-white p-5 sm:p-8" aria-labelledby="contact-heading">
                <div className="mb-7 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F1F4] text-primary"><Check size={17}/></span><h2 id="contact-heading" className="font-heading text-[31px] text-primary sm:text-[35px]">Contact</h2></div>
                <Field name="email" label="Email address" type="email" autoComplete="email" required placeholder="you@example.com" />
                <p className="mt-3 font-sans text-[11px] leading-relaxed text-primary/45">Preview only. Your address is not sent or saved.</p>
              </section>
              <section className="rounded-[26px] border border-primary/10 bg-white p-5 sm:p-8" aria-labelledby="delivery-heading">
                <div className="mb-7 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F1F4] text-primary"><Truck size={17}/></span><h2 id="delivery-heading" className="font-heading text-[31px] text-primary sm:text-[35px]">Delivery</h2></div>
                <div className="mb-6 flex items-center gap-3 rounded-[16px] border border-[#ADCBD5] bg-[#F4FAFA] px-4 py-4"><Truck size={20} strokeWidth={1.4} className="text-primary"/><div className="min-w-0"><p className="font-sans text-[13px] font-semibold text-primary">Shipping to your address</p><p className="mt-1 font-sans text-[12px] text-primary/55">Shipping rates and timing will be confirmed during live checkout.</p></div></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field name="firstName" label="First name" autoComplete="given-name" required />
                  <Field name="lastName" label="Last name" autoComplete="family-name" required />
                  <Field className="sm:col-span-2" name="address" label="Street address" autoComplete="street-address" required />
                  <Field name="city" label="City" autoComplete="address-level2" required />
                  <Field name="region" label="State / Region" autoComplete="address-level1" required />
                  <Field name="postalCode" label="ZIP / Postal code" autoComplete="postal-code" required />
                  <Field name="country" label="Country / Region" autoComplete="country-name" required />
                </div>
              </section>
              <section className="rounded-[26px] border border-primary/10 bg-white p-5 sm:p-8" aria-labelledby="payment-heading">
                <div className="mb-4 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F1F4] text-primary"><CreditCard size={17}/></span><h2 id="payment-heading" className="font-heading text-[31px] text-primary sm:text-[35px]">Payment</h2></div>
                <p className="font-sans text-[13px] leading-[1.85] text-primary/60">Secure payment options and eligible express checkout buttons will appear on the real Shopify checkout. No payment information is collected on this preview page.</p>
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#F5F8F7] px-4 py-4 font-sans text-[12px] text-primary/65"><LockKeyhole size={17} className="shrink-0 text-[#6999AD]"/>Payment information is never stored in this frontend.</div>
              </section>
              <Link href="/cart" className="inline-flex items-center gap-2 py-2 font-sans text-[13px] font-semibold text-primary hover:underline"><ArrowLeft size={17}/> Return to your bag</Link>
            </div>

            <aside className="min-w-0 rounded-[26px] border border-primary/10 bg-white p-5 shadow-[0_18px_50px_rgba(6,48,74,0.045)] sm:p-7 lg:sticky lg:top-28" aria-label="Order summary">
              <div className="flex items-end justify-between gap-3 border-b border-primary/10 pb-5"><h2 className="font-heading text-[32px] leading-none text-primary">Your Order.</h2><span className="font-sans text-[12px] text-primary/50">{count} items</span></div>
              <div>{items.map((item) => <OrderItem key={item.key} item={item}/>)}</div>
              <div className="mt-6 rounded-[18px] bg-[#EDF6F8] p-4">
                <div className="flex items-start gap-2 font-sans text-[12px] font-medium leading-relaxed text-primary"><Truck size={17} className="mt-0.5 shrink-0"/>{reachedThreshold ? 'You have reached the advertised free-shipping threshold.' : `Add ${money(remaining)} more to reach the free-shipping threshold.`}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary/10"><div role="progressbar" aria-valuemin={0} aria-valuemax={SHIPPING_THRESHOLD} aria-valuenow={Math.min(subtotal, SHIPPING_THRESHOLD)} aria-label="Free-shipping progress" className="h-full rounded-full bg-primary transition-[width] duration-500" style={{width:`${progress}%`}}/></div>
                <p className="mt-2 font-sans text-[11px] text-primary/55">Actual shipping eligibility is confirmed in live checkout.</p>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-[16px] border border-dashed border-primary/15 bg-[#FBFCFB] px-4 py-4"><Tag size={19} className="shrink-0 text-[#6999AD]"/><div><p className="font-sans text-[13px] font-semibold text-primary">Discount codes</p><p className="mt-1 font-sans text-[11px] leading-relaxed text-primary/50">Apply and validate codes during live checkout.</p></div></div>
              <dl className="mt-6 space-y-3 border-t border-primary/10 pt-5 font-sans text-[13px]">
                <div className="flex justify-between text-primary/65"><dt>Subtotal</dt><dd className="font-semibold text-primary">{money(subtotal)}</dd></div>
                <div className="flex justify-between text-primary/65"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
                <div className="flex justify-between text-primary/65"><dt>Taxes</dt><dd>Calculated at checkout</dd></div>
              </dl>
              <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-5"><span className="font-sans text-[14px] font-semibold text-primary">Estimated subtotal</span><strong className="font-heading text-[30px] font-normal text-primary">{money(subtotal)}</strong></div>
              <p className="mt-1 font-sans text-[11px] leading-relaxed text-primary/50">This is not a final order total. Delivery, taxes and discounts are unconfirmed.</p>
              <button type="button" disabled className="mt-6 flex min-h-[58px] w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-primary/45 px-5 font-sans text-[14px] font-semibold text-white"><LockKeyhole size={18}/> Secure checkout not connected</button>
              <p className="mt-3 text-center font-sans text-[11px] leading-relaxed text-primary/50">Connect Shopify cart + checkout before accepting live orders.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
