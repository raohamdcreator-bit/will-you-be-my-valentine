// TODO: Replace with your actual Stripe Payment Link
// Create at: https://dashboard.stripe.com/payment-links
// Set success_url to: https://will-you-be-my-valentine-97uc.vercel.app/valentine

export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_XXXXXXXXXXXXX';

export const redirectToPayment = () => {
  window.location.href = STRIPE_PAYMENT_LINK;
};
