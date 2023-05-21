import { retrieve } from '@/api/tenants/retrieve';
import { update } from '@/api/tenants/update';
import { stripe } from '@/api/tenants/stripe';
import { checkoutSessions } from '@/api/tenants/checkoutSessions';

export const tenants = {
  checkoutSessions,
  stripe,
  retrieve,
  update,
};
