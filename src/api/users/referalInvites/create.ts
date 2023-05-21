import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { createReferralInviteSchema, userIdSchema } from '@/api/users/schemas';

export const create = async (
  userId: z.infer<typeof userIdSchema>,
  user: z.infer<typeof createReferralInviteSchema>,
  options: ApiOptions,
) => {
  const isUUID = userIdSchema.safeParse(userId);
  const isUser = createReferralInviteSchema.safeParse(user);

  if (!isUser.success) {
    throw new Error(
      `The argument "user" is only allowed to be a typeof createReferralSchema but received: "${user.toString()}"`,
    );
  }
  if (!isUUID.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid but received: "${userId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/users/${userId}/referral-invites`,
    {
      headers: options.headers,
      method: 'POST',
      body: JSON.stringify(user),
    },
  ).fetch();

  return response;
};
