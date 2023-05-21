import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, Tenant } from '@/types';
import { tenantIdSchema, tenantMeSchema } from '@/api/tenants/schemas';

export const retrieve = async (
  tenantId: z.infer<typeof tenantIdSchema> | z.infer<typeof tenantMeSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);
  const isMe = tenantMeSchema.safeParse(tenantId);

  if (!isUUID.success && !isMe.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid or "me" but received: "${tenantId}"`,
    );
  }

  const response = await request<Tenant>(
    `${options.url}/${options.version}/tenants/${tenantId}?test=${options.test}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
