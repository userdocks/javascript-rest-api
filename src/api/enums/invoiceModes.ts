/* eslint-disable */
export const invoiceModes = [
  'payment',
  'subscription',
] as const;

/* eslint-disable */
export const paymentModes = [
  ...invoiceModes,
  'setup',
] as const;
