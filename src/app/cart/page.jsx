'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartLine, CartSummary, ComplementaryItem, EmptyCart } from '@/components/cart/CartUI';
export default function CartPage() {
  const {items,count,hydrated} = useCart();
  return <main className="min-h-svh bg-[#FBFCFB] pb-20 pt-32 sm:pt-40">
    <section className="border-b border-primary/10 bg-linear-to-br from-[#F8FAF9] via-[#EFF7F8] to-[#DEEDF1] px-4 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-360"><p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#6999AD]">Your skincare ritual</p><h1 className="font-heading mt-4 text-[clamp(3.5rem,6vw,6rem)] leading-none text-primary">Your <em>Bag.</em></h1><p className="mt-5 font-sans text-[14px] text-primary/60">A considered collection of your selected NUOVÉ essentials.</p></div></section>
    <section aria-label="Shopping bag contents" className="mx-auto max-w-360 px-4 py-12 sm:px-6 lg:py-16">
      {!hydrated ? <p className="font-sans text-primary/60">Loading your bag…</p> : !items.length ? <div className="rounded-[26px] border border-primary/10 bg-white"><EmptyCart/></div> : <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)] lg:gap-16">
        <div><div className="flex items-end justify-between border-b border-primary/15 pb-5"><h2 className="font-heading text-[32px] text-primary">Selected Products</h2><span className="font-sans text-[13px] text-primary/50">{count} items</span></div>{items.map(item => <CartLine key={item.key} item={item}/>)}<ComplementaryItem/><Link href="/collections/all" className="mt-8 inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-primary hover:underline"><ArrowLeft size={17}/> Continue shopping</Link></div>
        <aside className="rounded-[26px] border border-primary/10 bg-white p-5 shadow-[0_20px_70px_rgba(6,48,74,0.035)] sm:p-7 lg:sticky lg:top-28"><h2 className="font-heading mb-6 text-[32px] text-primary">Order Summary</h2><CartSummary/><Link href="/collections/all" className="mt-5 flex items-center justify-center gap-2 rounded-full border border-primary/15 py-3 font-sans text-[13px] font-semibold text-primary hover:bg-[#EFF6F8]">Keep exploring <ArrowUpRight size={16}/></Link></aside>
      </div>}
    </section>
  </main>;
}
