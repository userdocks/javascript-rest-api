import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, Tenant } from '@/types';
import {
  updateTenantSchema,
  tenantIdSchema,
  tenantMeSchema,
} from '@/api/tenants/schemas';

export const update = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  tenant: z.infer<typeof updateTenantSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);
  const isMe = tenantMeSchema.safeParse(tenantId);
  const isTenant = updateTenantSchema.safeParse(tenant);

  if (!isTenant.success) {
    throw new Error(
      `The argument "tenant" is only allowed to be a typeof updateTenantSchema but received: "${tenant.toString()}"`,
    );
  }
  if (!isUUID.success && !isMe.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid or "me" but received: "${tenantId}"`,
    );
  }

  const response = await request<Tenant>(
    `${options.url}/${options.version}/tenants/${tenantId}`,
    {
      headers: options.headers,
      method: 'PUT',
      body: JSON.stringify({
        tenant,
      }),
    },
  ).fetch();

  return response;
};
