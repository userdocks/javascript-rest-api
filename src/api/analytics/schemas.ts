import { z } from 'zod';

export const fromSchema = z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);

export const toSchema = fromSchema;
