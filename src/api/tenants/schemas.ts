import { z } from 'zod';

import { countries } from '@/api/enums/countries';
import { taxExempts } from '@/api/enums/taxExempts';

export const tenantIdSchema = z.string().uuid();

export const tenantMeSchema = z.string().regex(/me/);

export const promotionCodeSchema = z.string();

export const updateTenantSchema = z.object({
  name: z.string().max(256).optional(),
  description: z.string().max(256).optional(),
  companyName: z.string().max(256).optional(),
  companyVATId: z.string().max(256).optional(), // value added tax identification number
  companyTaxType: z.string().max(256).optional(),
  companyTaxExempt: z.enum(taxExempts).optional(),
  isBusinessCustomer: z.boolean().optional(),
  shippingAddress: z
    .object({
      name: z.string().max(256).optional(),
      city: z.string().max(256).optional(),
      country: z.enum(countries).optional(),
      line1: z.string().max(256).optional(),
      line2: z.string().max(256).optional(),
      postal_code: z.string().max(256).optional(),
      state: z.string().max(256).optional(),
      type: z.string().max(256).optional(),
    })
    .optional(),
  billingAddress: z
    .object({
      name: z.string().max(256).optional(),
      city: z.string().max(256).optional(),
      country: z.enum(countries).optional(),
      line1: z.string().max(256).optional(),
      line2: z.string().max(256).optional(),
      postal_code: z.string().max(256).optional(),
      state: z.string().max(256).optional(),
      type: z.string().max(256).optional(),
    })
    .optional(),
});
