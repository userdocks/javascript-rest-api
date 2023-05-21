import { z } from 'zod';
import { apiKeyTypes } from './enums/apiKeyTypes';

export const apiHeaderServerOnlySchema = z.object({
  'X-API-KEY': z.string(),
  'X-CLIENT-ID': z.string(),
  'X-API-KEY-TYPE': z.enum(apiKeyTypes),
});
