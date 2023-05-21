import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { promotionCodeSchema, userIdSchema } from '@/api/users/schemas';

export const use = async (
  userId: z.infer<typeof userIdSchema>,
  promotionCode: z.infer<typeof promotionCodeSchema>,
  options: ApiOptions,
) => {
  const isUUID = userIdSchema.safeParse(userId);
  const isPromotionCode = promotionCodeSchema.safeParse(promotionCode);

  if (!isPromotionCode.success) {
    throw new Error(
      `The argument "promotionCode" is only allowed to be a string with more than 0 characters but received: "${promotionCode}"`,
    );
  }
  if (!isUUID.success) {
    throw new Error(
      `The argument "userId" is only allowed to be a uuid but received: "${userId}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/users/${userId}/promotion-codes/${promotionCode}`,
    {
      headers: options.headers,
      method: 'PUT',
    },
  ).fetch();

  return response;
};
