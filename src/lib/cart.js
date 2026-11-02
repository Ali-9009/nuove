// NUOVE browser-only cart. No Shopify connection or checkout processing.
const KEY = 'nuove-cart-v2';
const EVENT = 'nuove:cart-change';
const OPEN = 'nuove:cart-open';
const MAX_QTY = 10;
const cleanQty = (value) => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(value) || 1)));
const hasWindow = () => typeof window !== 'undefined';

export function getCart() {
  if (!hasWindow()) return [];
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(data) ? data.filter((item) => item && item.key && item.handle) : [];
  } catch { return []; }
}
function saveCart(items) {
  if (!hasWindow()) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT));
    return true;
  } catch { return false; }
}
export function subscribeCart(listener) {
  if (!hasWindow()) return () => {};
  window.addEventListener(EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}
export function openCart() { if (hasWindow()) window.dispatchEvent(new Event(OPEN)); }
export function subscribeCartOpen(fn) {
  if (!hasWindow()) return () => {};
  window.addEventListener(OPEN, fn);
  return () => window.removeEventListener(OPEN, fn);
}
export function addToCart(product, quantity = 1, variant = null) {
  if (!hasWindow() || !product || product.available === false || variant?.available === false) return false;
  const handle = product.handle;
  if (!handle) return false;
  const variantId = String(variant?.id ?? 'default');
  const key = `${handle}::${variantId}`;
  const items = getCart();
  const index = items.findIndex((item) => item.key === key);
  const price = Number(variant?.price ?? product.price);
  if (!Number.isFinite(price) || price < 0) return false;
  if (index >= 0) {
    items[index] = { ...items[index], quantity: Math.min(MAX_QTY, items[index].quantity + cleanQty(quantity)) };
  } else {
    items.push({ key, handle, variantId, quantity: cleanQty(quantity), name: product.name,
      image: product.image || '', variantLabel: variant?.label || variant?.size || variant?.name || '',
      cartType: product.cartType || 'product',
      includedProducts: Array.isArray(product.includedProducts) ? product.includedProducts : [],
      price, compareAtPrice: Number(variant?.compareAtPrice ?? product.compareAtPrice) || null });
  }
  return saveCart(items);
}
export function updateCartQuantity(key, quantity) {
  const qty = Number(quantity);
  const items = getCart();
  return saveCart(qty <= 0 ? items.filter((item) => item.key !== key) : items.map((item) => item.key === key ? { ...item, quantity: cleanQty(qty) } : item));
}
export function removeFromCart(key) { return saveCart(getCart().filter((item) => item.key !== key)); }
export function clearCart() { return saveCart([]); }
export function getCartSubtotal(items = getCart()) { return items.reduce((sum, item) => sum + item.price * item.quantity, 0); }
export function getCartCount(items = getCart()) { return items.reduce((sum, item) => sum + item.quantity, 0); }
