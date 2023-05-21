import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, PublicKey } from '@/types';
import { appIdSchema } from '@/api/apps/schemas';
import { isServer } from '@/config';
import { apiHeaderServerOnlySchema } from '@/api/schemas';

export const retrieve = async (
  appId: z.infer<typeof appIdSchema>,
  options: ApiOptions,
) => {
  const isUUID = appIdSchema.safeParse(appId);
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

  const response = await request<PublicKey>(
    `${options.url}/${options.version}/apps/${appId}/public-keys?test=${options.test}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
