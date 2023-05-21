import { list as listPromotions } from '@/api/apps/promotions/list';
import { retrieve as retrievePublicKeys } from '@/api/apps/publicKeys/retrieve';
import { list as listUserRoles } from '@/api/apps/userRoles/list';
import { update as updateUserAccessStatus } from '@/api/apps/users/accessStatus/update';

export const apps = {
  promotions: {
    list: listPromotions,
  },
  publicKeys: {
    retrieve: retrievePublicKeys,
  },
  userRoles: {
    list: listUserRoles,
  },
  users: {
    accessStatus: {
      update: updateUserAccessStatus,
    },
  },
};
