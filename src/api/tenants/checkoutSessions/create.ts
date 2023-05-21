import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { tenantIdSchema } from '@/api/tenants/schemas';
import { createCheckoutSessionSchema } from '@/api/tenants/checkoutSessions/schemas';

export const create = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  checkoutSession: z.infer<typeof createCheckoutSessionSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);
  const isCheckoutSession =
    createCheckoutSessionSchema.safeParse(checkoutSession);

  if (!isCheckoutSession.success) {
    throw new Error(
      `The argument "checkoutSession" is only allowed to be a typeof createCheckoutSessionSchema but received: "${checkoutSession.toString()}"`,
    );
  }
  if (!isUUID.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid but received: "${tenantId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/tenants/${tenantId}/checkout-sessions`,
    {
      headers: options.headers,
      method: 'POST',
      body: JSON.stringify(checkoutSession),
    },
  ).fetch();

  return response;
};
