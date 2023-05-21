import { z } from 'zod';
import { countries } from '@/api/enums/countries';
import { paymentModes } from '@/api/enums/invoiceModes';
import { paymentMethodTypes } from '@/api/enums/paymentMethodTypes';

export const stripePriceIdSchema = z.string().includes('price_');
export const stripeTaxRateIdSchema = z.string().includes('txr_');

export const createCheckoutSessionSchema = z.object({
  price: stripePriceIdSchema,
  taxRate: stripeTaxRateIdSchema,
  allowedCountry: z.enum(countries),
  paymentMethodType: z.enum(paymentMethodTypes),
  billingAddressCollection: z.boolean(),
  mode: z.enum(paymentModes),
  quantity: z.number(),
  isReverseCharge: z.boolean(),
  state: z.string().min(64).max(64),
  test: z.boolean().optional(), // if true uses the stripe test API
});
