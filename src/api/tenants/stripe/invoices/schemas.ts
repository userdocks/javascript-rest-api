import { z } from 'zod';

import { invoiceModes } from '@/api/enums/invoiceModes';
import { tenantIdSchema } from '@/api/tenants/schemas';
import { userIdSchema } from '@/api/users/schemas';

export const stripePriceIdSchema = z.string().includes('price_');
export const stripeTaxRateIdSchema = z.string().includes('txr_');

export const createStripeInvoiceSchema = z.object({
  price: stripePriceIdSchema,
  taxRate: stripeTaxRateIdSchema,
  mode: z.enum(invoiceModes),
  quantity: z.number(),
  tenantId: tenantIdSchema,
  userId: userIdSchema,
  test: z.boolean().optional(), // if true uses the stripe test API
  footer: z.string().max(256).optional(),
});
