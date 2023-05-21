import { z } from 'zod';
import { defaultErrorMessage } from '@/defaultErrorMessage';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  isServer,
} from '@/config';

export enum Status {
  NotFound = 'NOTFOUND',
  Error = 'ERROR',
  Success = 'SUCCESS',
}

interface DefaultFetchWrapFetchResponse<T> {
  response: ApiResponse<T>;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

export type FetchWrapFetchResponse<T> =
  | (DefaultFetchWrapFetchResponse<T> & {
      ok: true;
      state: Status.Success;
      data: ApiSuccessResponse<T>;
      error: undefined;
      options: RequestInit;
    })
  | (DefaultFetchWrapFetchResponse<T> & {
      ok: false;
      state: Exclude<Status, Status.Success>;
      data: undefined;
      error: ApiErrorResponse;
      options: RequestInit;
    });

export interface FetchWrapResponse<T> {
  abortController: AbortController;
  fetch: () => Promise<FetchWrapFetchResponse<T>>;
}

export const request = <T>(
  url: string,
  options: RequestInit = {},
): FetchWrapResponse<T> => {
  const isUrl = z.string().url().safeParse(url);

  if (!isUrl.success) {
    throw new Error(
      `The argument url is only allowed to be a valid url but received: ${url}`,
    );
  }

  const thisGlobal = isServer() ? global : window;
  const abortController = new thisGlobal.AbortController();

  return {
    abortController,
    fetch: async () => {
      const correctUrl = new URL(url);
      const ensureSlashUrl = correctUrl.toString();

      let response: Response;

      try {
        response = await fetch(ensureSlashUrl, {
          signal: abortController.signal,
          method: 'GET',
          ...options,
        });
      } catch (e) {
        const error = defaultErrorMessage(
          e instanceof Error && e.message ? e.message : 'Something went wrong',
        );

        return {
          ok: false,
          error,
          response: error,
          state: Status.Error,
          data: undefined,
          status: 500,
          statusText: '',
          type: '',
          url: ensureSlashUrl,
          redirected: false,
          options,
        };
      }

      let data: ApiResponse<T> | ApiErrorResponse;
      let error: ApiErrorResponse | undefined;
      let { statusText } = response;
      let state = Status.Error;

      try {
        data = await response.json();

        if (response.ok && !('errors' in data)) {
          return {
            ok: true,
            data,
            response: data,
            state: Status.Success,
            error: undefined,
            redirected: false,
            status: 200,
            statusText: '',
            type: '',
            url: ensureSlashUrl,
            options,
          };
        }
      } catch {
        data = defaultErrorMessage();
      }

      error = defaultErrorMessage();
      statusText = response.statusText || 'Something went wrong';

      if (data && 'errors' in data) {
        error = data;
      }

      if (response.status === 400) {
        statusText = response.statusText || 'Something went wrong';
      }

      if (response.status === 404) {
        state = Status.NotFound;
      }

      return {
        ok: false,
        error,
        response: error,
        redirected: response.redirected,
        status: response.status,
        statusText,
        type: response.type,
        url: ensureSlashUrl,
        data: undefined,
        state,
        options,
      };
    },
  };
};
