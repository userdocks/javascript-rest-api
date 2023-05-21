import { z } from 'zod';

import { apiHeaderServerOnlySchema } from '@/api/schemas';
import { isServer } from '@/config';
import { request } from '@/request';
import { ApiOptions, User } from '@/types';
import { fromSchema, toSchema } from '@/api/analytics/schemas';

export const list = async (
  from: z.infer<typeof fromSchema>,
  to: z.infer<typeof toSchema>,
  options: ApiOptions,
) => {
  const hasServerOnlyHeaders = apiHeaderServerOnlySchema.safeParse(
    options.headers,
  );
  const isFrom = fromSchema.safeParse(from);
  const isTo = toSchema.safeParse(to);

  if (!isServer()) {
    throw new Error(
      'This route is only availabe on the Server. Do not use API KEYS on the client!',
    );
  }
  if (!hasServerOnlyHeaders.success) {
    throw new Error('You can only access this data with an API KEY!');
  }
  if (!isFrom.success) {
    throw new Error(
      `The argument "from" is only allowed to be a date in the following format "YYYY-MM-DD" but received: "${from}"`,
    );
  }
  if (!isTo.success) {
    throw new Error(
      `The argument "to" is only allowed to be a date in the following format "YYYY-MM-DD" but received: "${to}"`,
    );
  }

  const response = await request<User>(
    `${options.url}/${options.version}/analytics/one-time-payments?test=${options.test}&from=${from}&to=${to}`,
    {
      headers: options.headers,
      method: 'GET',
    },
  ).fetch();

  return response;
};
