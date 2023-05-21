import { z } from 'zod';

import { request } from '@/request';
import { ApiOptions } from '@/types';
import { tenantIdSchema, tenantMeSchema } from '@/api/tenants/schemas';
import { updateStripeSubscriptionSchema } from '@/api/tenants/stripe/subscriptions/schemas';

export const update = async (
  tenantId: z.infer<typeof tenantIdSchema>,
  stripeSubscription: z.infer<typeof updateStripeSubscriptionSchema>,
  options: ApiOptions,
) => {
  const isUUID = tenantIdSchema.safeParse(tenantId);
  const isMe = tenantMeSchema.safeParse(tenantId);
  const isStripeSubscription =
    updateStripeSubscriptionSchema.safeParse(stripeSubscription);

  if (!isStripeSubscription.success) {
    throw new Error(
      `The argument "stripeSubscription" is only allowed to be a typeof updateStripeSubscriptionSchema but received: "${stripeSubscription.toString()}"`,
    );
  }
  if (!isUUID.success && !isMe.success) {
    throw new Error(
      `The argument "tenantId" is only allowed to be a uuid or "me" but received: "${tenantId}"`,
    );
  }

  const response = await request<null>(
    `${options.url}/${options.version}/tenants/${tenantId}/stripe-subscriptions`,
    {
      headers: options.headers,
      method: 'PUT',
      body: JSON.stringify(stripeSubscription),
    },
  ).fetch();

  return response;
};
