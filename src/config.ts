import { ZodIssue } from 'zod';
import { ApiHeaders } from './types';

const BASE_API_URL = 'https://api.userdocks.com';
const API_VERSION = 'v1';
const TEST_MODE = true;

export interface ApiSuccessResponse<Type> {
  kind: string;
  itemsLength: number;
  response: Type;
}

export interface ApiErrorResponse {
  kind: 'errors';
  itemsLength: number;
  errors: ZodIssue[] | { message: string }[];
}

export type ApiResponse<Type> = ApiSuccessResponse<Type> | ApiErrorResponse;

export const isServer = () => {
  let hasWindowObject: boolean;

  try {
    hasWindowObject = typeof window === 'object';
  } catch (err) {
    hasWindowObject = false;
  }

  return !hasWindowObject;
};

export const baseHeaders = (headers: ApiHeaders) => ({
  ...headers,
  'Content-Type': 'application/json',
});

export const config = (headers: ApiHeaders) => ({
  url: BASE_API_URL,
  version: API_VERSION,
  test: TEST_MODE,
  headers: baseHeaders(headers),
});
