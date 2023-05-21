import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, PublicKey } from '@/types';
import { appIdSchema } from '@/api/apps/schemas';
import { userIdSchema } from '@/api/users/schemas';
import { accessStatusSchema } from '@/api/apps/users/accessStatus/schemas';
import { apiHeaderServerOnlySchema } from '@/api/schemas';
import { isServer } from '@/config';

export const update = async (
  appId: z.infer<typeof appIdSchema>,
  userId: z.infer<typeof userIdSchema>,
  accessStatus: z.infer<typeof accessStatusSchema>,
  options: ApiOptions,
) => {
  const isUUID = appIdSchema.safeParse(appId);
  const isUserId = userIdSchema.safeParse(userId);
  const isAccessStatus = accessStatusSchema.safeParse(accessStatus);
  const hasServerOnlyHeaders = apiHeaderServerOnlySchema.safeParse(
    options.headers,
  );

  if (!isServer()) {
    throw new Error(
      'This route is only availabe on the Server. Do not use API KEYS on the client!',
    );
  }
  if (!hasServerOnlyHeaders.success) {
    throw new Error('You can only access this data with an API KEY!');
  }
  if (!isUUID.success) {
    throw new Error(
      `The argument "appId" is only allowed to be a uuid but received: "${appId}"`,
    );
  }
  if (!isUserId.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid but received: "${userId}"`,
    );
  }
  if (!isAccessStatus.success) {
    throw new Error(
      `The argument "accessStatus" is only allowed to be a "0" or "1" but received: "${accessStatus}"`,
    );
  }

  const response = await request<PublicKey>(
    `${options.url}/${options.version}/apps/${appId}/users/${userId}/access-status/${accessStatus}?test=${options.test}`,
    {
      headers: options.headers,
      method: 'PUT',
    },
  ).fetch();

  return response;
};
