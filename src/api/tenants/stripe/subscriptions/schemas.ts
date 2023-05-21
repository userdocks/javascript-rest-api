import { z } from 'zod';
import {
  stripePriceIdSchema,
  stripeTaxRateIdSchema,
} from '@/api/tenants/stripe/invoices/schemas';
import { tenantIdSchema } from '@/api/tenants/schemas';
import { userIdSchema } from '@/api/users/schemas';

export const updateStripeSubscriptionSchema = z.object({
  price: stripePriceIdSchema,
  taxRate: stripeTaxRateIdSchema,
  quantity: z.number().int(),
  tenantId: tenantIdSchema,
  userId: userIdSchema,
  test: z.boolean().optional(),
});
