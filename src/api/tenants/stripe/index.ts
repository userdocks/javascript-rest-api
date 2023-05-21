import { list } from '@/api/tenants/stripe/invoices/list';
import { create } from '@/api/tenants/stripe/invoices/create';
import { del } from '@/api/tenants/stripe/paymentMethods/del';
import { del as deleteSubscription } from '@/api/tenants/stripe/subscriptions/del';
import { update } from '@/api/tenants/stripe/subscriptions/update';

export const stripe = {
  invoices: {
    list,
    create,
  },
  paymentMethods: {
    del,
  },
  subscriptions: {
    del: deleteSubscription,
    update,
  },
};
