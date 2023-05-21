import { z } from 'zod';

import * as Types from '@/types';
import { api } from '@/api';
import { generateUuid } from '@/generateUuid';
import { config, isServer } from '@/config';
import {
  createReferralInviteSchema,
  updateUserSchema,
} from '@/api/users/schemas';
import { updateTenantSchema } from '@/api/tenants/schemas';
import { createCheckoutSessionSchema } from '@/api/tenants/checkoutSessions/schemas';
import { createStripeInvoiceSchema } from '@/api/tenants/stripe/invoices/schemas';
import { updateStripeSubscriptionSchema } from '@/api/tenants/stripe/subscriptions/schemas';
import { accessStatusSchema } from '@/api/apps/users/accessStatus/schemas';
import { apiHeaderServerOnlySchema } from '@/api/schemas';

let initOptions: Types.ApiOptions;
let initVersion: string;

const isInitialized = () => !!initVersion;

const warn = (options: Types.ApiOptions) => {
  if (!isInitialized()) {
    throw new Error(
      'Userdocks: Make sure to initialize userdocks before you use the method',
    );
  }

  const hasServerOnlyHeaders = apiHeaderServerOnlySchema.safeParse(
    options.headers,
  );

  if (!isServer() && hasServerOnlyHeaders.success) {
    throw new Error('Userdocks: API KEYS can only be used on the server!');
  }
};

const userdocks = {
  initialize: async (
    headers: Types.ApiHeaders,
    options?: Omit<Types.ApiOptions, 'headers'>,
  ) => {
    const isUrl = z.string().url().safeParse(options?.url);
    const isVersion = z.string().regex(/v1/).safeParse(options?.version);
    const isTest = z.boolean().safeParse(options?.test);

    if (options?.url && !isUrl.success) {
      throw new Error(
        `The argument url is only allowed to be a valid url but received: ${options?.url}`,
      );
    }
    if (options?.version && !isVersion.success) {
      throw new Error(
        `The argument version is only allowed to be a valid version but received: ${options?.version}`,
      );
    }
    if (options?.test && !isTest.success) {
      throw new Error(
        `The argument test is only allowed to be a boolean but received: ${options?.test}`,
      );
    }

    initOptions =
      options?.url && options?.version && options?.test
        ? {
            headers,
            ...options,
          }
        : config(headers);

    if (initVersion) {
      console.warn(
        'Userdocks: Please make sure you initialize userdocks SDK only once',
      );
    } else {
      initVersion = generateUuid();
    }

    return {
      options: initOptions,
      version: initVersion,
      isServer: isServer(),
    };
  },
  analytics: {
    oneTimePayments: {
      async list(from: string, to: string) {
        warn(initOptions);

        return api.analytics.oneTimePayments.list(from, to, initOptions);
      },
    },
    signIns: {
      async list(from: string, to: string) {
        warn(initOptions);

        return api.analytics.signIns.list(from, to, initOptions);
      },
    },
    subscriptions: {
      async list(from: string, to: string) {
        warn(initOptions);

        return api.analytics.subscriptions.list(from, to, initOptions);
      },
    },
    tenants: {
      async list(from: string, to: string) {
        warn(initOptions);

        return api.analytics.tenants.list(from, to, initOptions);
      },
    },
  },
  apps: {
    promotions: {
      async list(appId: string) {
        warn(initOptions);

        return api.apps.promotions.list(appId, initOptions);
      },
    },
    publicKeys: {
      async retrieve(appId: string) {
        warn(initOptions);

        return api.apps.publicKeys.retrieve(appId, initOptions);
      },
    },
    userRoles: {
      async list(appId: string) {
        warn(initOptions);

        return api.apps.userRoles.list(appId, initOptions);
      },
    },
    users: {
      accessStatus: {
        async update(
          appId: string,
          userId: string,
          accessStatus: z.infer<typeof accessStatusSchema>,
        ) {
          warn(initOptions);

          return api.apps.users.accessStatus.update(
            appId,
            userId,
            accessStatus,
            initOptions,
          );
        },
      },
    },
  },
  tenants: {
    async retrieve(tenantId: string) {
      warn(initOptions);

      return api.tenants.retrieve(tenantId, initOptions);
    },
    async update(tenantId: string, tenant: z.infer<typeof updateTenantSchema>) {
      warn(initOptions);

      return api.tenants.update(tenantId, tenant, initOptions);
    },
    checkoutSessions: {
      async create(
        tenantId: string,
        checkoutSession: z.infer<typeof createCheckoutSessionSchema>,
      ) {
        warn(initOptions);

        return api.tenants.checkoutSessions.create(
          tenantId,
          checkoutSession,
          initOptions,
        );
      },
    },
    stripe: {
      invoices: {
        async list(tenantId: string) {
          warn(initOptions);

          return api.tenants.stripe.invoices.list(tenantId, initOptions);
        },
        async create(
          tenantId: string,
          stripeInvoice: z.infer<typeof createStripeInvoiceSchema>,
        ) {
          warn(initOptions);

          return api.tenants.stripe.invoices.create(
            tenantId,
            stripeInvoice,
            initOptions,
          );
        },
      },
      paymentMethods: {
        async del(tenantId: string) {
          warn(initOptions);

          return api.tenants.stripe.paymentMethods.del(tenantId, initOptions);
        },
      },
      subscriptions: {
        async del(tenantId: string) {
          warn(initOptions);

          return api.tenants.stripe.subscriptions.del(tenantId, initOptions);
        },
        async update(
          tenantId: string,
          stripeSubscription: z.infer<typeof updateStripeSubscriptionSchema>,
        ) {
          warn(initOptions);

          return api.tenants.stripe.subscriptions.update(
            tenantId,
            stripeSubscription,
            initOptions,
          );
        },
      },
    },
  },
  users: {
    referralInvites: {
      async create(
        userId: string,
        user: z.infer<typeof createReferralInviteSchema>,
      ) {
        warn(initOptions);

        return api.users.referralInvites.create(userId, user, initOptions);
      },
    },
    async del(userId: string) {
      warn(initOptions);

      return api.users.del(userId, initOptions);
    },
    async retrieve(userId: string) {
      warn(initOptions);

      return api.users.retrieve(userId, initOptions);
    },
    async update(userId: string, user: z.infer<typeof updateUserSchema>) {
      warn(initOptions);

      return api.users.update(userId, user, initOptions);
    },
    promotionCodes: {
      async use(userId: string, promotionCode: string) {
        warn(initOptions);

        return api.users.promotionCodes.use(userId, promotionCode, initOptions);
      },
    },
  },
};

export { userdocks };
