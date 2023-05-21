import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { appIdSchema } from '@/api/apps/schemas';
import { apiHeaderServerOnlySchema } from '@/api/schemas';
import { isServer } from '@/config';

export const list = async (
  appId: z.infer<typeof appIdSchema>,
  options: ApiOptions,
) => {
  const isAppId = appIdSchema.safeParse(appId);
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
  if (!isAppId.success) {
    throw new Error(
      `The argument "isAppId" is only allowed to be a uuid but received: "${appId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/apps/${appId}/promotions?test=${options.test}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
