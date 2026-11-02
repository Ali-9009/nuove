"use client";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
export default function CartProviders({ children }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <Toaster
        position="top-right"
        containerClassName="!top-[85px] !right-3 sm:!right-6 lg:!right-[100px]"
        containerStyle={{ zIndex: 300 }}
        toastOptions={{
          duration: 3200,
          style: {
            fontFamily: "Manrope, sans-serif",
            fontSize: 13,
            borderRadius: 16,
            color: "#06304A",
          },
        }}
      />
    </CartProvider>
  );
}
