import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { userEmailSchema, userIdSchema, userMeSchema } from './schemas';

export const retrieve = async (
  userId:
    | z.infer<typeof userIdSchema>
    | z.infer<typeof userEmailSchema>
    | z.infer<typeof userMeSchema>,
  options: ApiOptions,
) => {
  const isUUID = userIdSchema.safeParse(userId);
  const isEmail = userEmailSchema.safeParse(userId);
  const isMe = userMeSchema.safeParse(userId);

  if (!isEmail.success && !isUUID.success && !isMe.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid, an email, or "me" but received: "${userId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/users/${userId}?test=${options.test}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
