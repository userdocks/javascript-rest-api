import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions } from '@/types';
import { tenantIdSchema } from '@/api/tenants/schemas';

export const del = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);

  if (!isUUID.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid but received: "${tenantId}"`,
    );
  }

  const response = await request<null>(
    `${options.url}/${options.version}/tenants/${tenantId}/stripe-subscriptions?test=${options.test}`,
    {
      headers: options.headers,
      method: 'DELETE',
    },
  ).fetch();

  return response;
};
