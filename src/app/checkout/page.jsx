import CheckoutPreview from '@/components/checkout/CheckoutPreview';

export const metadata = {
  title: 'Checkout Preview | NUOVÉ',
  description: 'Review your NUOVÉ skincare bag before secure checkout is enabled.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPreview />;
}
