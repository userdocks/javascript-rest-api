import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { userEmailSchema, userIdSchema } from '@/api/users/schemas';

export const del = async (
  userId: z.infer<typeof userEmailSchema>,
  options: ApiOptions,
) => {
  const isUUID = userIdSchema.safeParse(userId);

  if (!isUUID.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid or an email but received: "${userId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/users/${userId}?test=${options.test}`,
    {
      headers: options.headers,
      method: 'DELETE',
    },
  ).fetch();

  return response;
};
