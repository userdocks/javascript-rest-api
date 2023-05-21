import { list as listOneTimePayments } from '@/api/analytics/oneTimePayments/list';
import { list as listSignIns } from '@/api/analytics/signIns/list';
import { list as listSubscriptions } from '@/api/analytics/subscriptions/list';
import { list as listTenants } from '@/api/analytics/tenants/list';

export const analytics = {
  oneTimePayments: {
    list: listOneTimePayments,
  },
  signIns: {
    list: listSignIns,
  },
  subscriptions: {
    list: listSubscriptions,
  },
  tenants: {
    list: listTenants,
  },
};
