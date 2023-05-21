import { z } from 'zod';

export const appIdSchema = z.string().uuid();
