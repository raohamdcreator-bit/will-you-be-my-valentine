// Payment functionality disabled for demo
// The app now redirects directly to the valentine page

export const STRIPE_PAYMENT_LINK = ''; // Not used in demo mode

export const redirectToPayment = () => {
  // Redirect to valentine page instead of payment
  window.location.href = '/valentine';
};
