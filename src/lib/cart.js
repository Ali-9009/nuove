export const CART_KEY = "nuove-cart";

export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    const stored = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));

  window.dispatchEvent(new Event("nuove-cart-updated"));
}

export function addToCart(product, quantity = 1, variant = null) {
  if (!product.available) return false;

  const variantId = variant?.id ?? "default";
  const key = `${product.handle}:${variantId}`;

  const items = getCart();

  const existing = items.find((item) => item.key === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      key,
      handle: product.handle,
      variantId,
      quantity,
    });
  }

  saveCart(items);

  return true;
}

export function updateCartQuantity(key, quantity) {
  const items = getCart();

  const updated = items
    .map((item) =>
      item.key === key ? { ...item, quantity } : item
    )
    .filter((item) => item.quantity > 0);

  saveCart(updated);
}

export function removeFromCart(key) {
  saveCart(getCart().filter((item) => item.key !== key));
}