import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { tenantIdSchema } from '@/api/tenants/schemas';
import { createStripeInvoiceSchema } from '@/api/tenants/stripe/invoices/schemas';

export const create = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  stripeInvoice: z.infer<typeof createStripeInvoiceSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);
  const isStripeInvoiceSchema =
    createStripeInvoiceSchema.safeParse(stripeInvoice);

  if (!isStripeInvoiceSchema.success) {
    throw new Error(
      `The argument "stripeInvoice" is only allowed to be a typeof createStripeInvoiceSchema but received: "${stripeInvoice.toString()}"`,
    );
  }
  if (!isUUID.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid but received: "${tenantId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/tenants/${tenantId}/stripe-invoices`,
    {
      headers: options.headers,
      method: 'POST',
      body: JSON.stringify(stripeInvoice),
    },
  ).fetch();

  return response;
};
