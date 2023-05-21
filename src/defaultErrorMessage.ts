import { ZodIssue } from 'zod';

import { ApiErrorResponse } from '@/config';

export const defaultErrorMessage = (message?: string): ApiErrorResponse => ({
  kind: 'errors',
  itemsLength: 1,
  errors: [
    {
      message: message || 'Bad Request',
    },
  ],
});

export const defaultErrorMessages = (
  errors: ZodIssue[] | { message: string }[],
): ApiErrorResponse => ({
  kind: 'errors',
  itemsLength: errors.length,
  errors,
});
