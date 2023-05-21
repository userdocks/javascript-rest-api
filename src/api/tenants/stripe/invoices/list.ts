import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { tenantIdSchema } from '@/api/tenants/schemas';

export const list = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  options: ApiOptions,
) => {
  const isTenantId = tenantIdSchema.safeParse(tenantId);

  if (!isTenantId.success) {
    throw new Error(
      `The argument "isTenantId" is only allowed to be a uuid but received: "${tenantId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/tenants/${tenantId}/stripe-invoices?test=${options.test}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
