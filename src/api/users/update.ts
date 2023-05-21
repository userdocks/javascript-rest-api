import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import {
  updateUserSchema,
  userIdSchema,
  userMeSchema,
} from '@/api/users/schemas';

export const update = async (
  userId: z.infer<typeof userIdSchema>,
  user: z.infer<typeof updateUserSchema>,
  options: ApiOptions,
) => {
  const isUUID = userIdSchema.safeParse(userId);
  const isMe = userMeSchema.safeParse(userId);
  const isUser = updateUserSchema.safeParse(user);

  if (!isUser.success) {
    throw new Error(
      `The argument "user" is only allowed to be a typeof updateUserSchema but received: "${user.toString()}"`,
    );
  }
  if (!isUUID.success && !isMe.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid or "me" but received: "${userId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/users/${userId}`,
    {
      headers: options.headers,
      method: 'PUT',
      body: JSON.stringify({
        user,
      }),
    },
  ).fetch();

  return response;
};
