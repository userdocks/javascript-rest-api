import { retrieve } from '@/api/users/retrieve';
import { update } from '@/api/users/update';
import { del } from '@/api/users/del';
import { use } from '@/api/users/promotionCodes/use';
import { create } from '@/api/users/referalInvites/create';

export const users = {
  retrieve,
  update,
  del,
  promotionCodes: {
    use,
  },
  referralInvites: {
    create,
  },
};
