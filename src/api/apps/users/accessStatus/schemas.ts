import { z } from 'zod';

import { accessStatus } from '@/api/enums/accessStatus';

export const accessStatusSchema = z.enum(accessStatus);
