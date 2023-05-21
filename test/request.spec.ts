import { request } from '@/request';

describe('request', () => {
  beforeEach(() => {
    // @ts-ignore
    global.window = global;
  });
  afterEach(() => {
    // @ts-ignore
    global.window = undefined;
  });
  test('use window object - wrong url', async () => {
    const response = async () => request('/test').fetch();

    await expect(response()).rejects.toThrow();
  });
  test('use window object - success', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        test: true,
      }),
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeTruthy();
    expect(response.data).toStrictEqual({ test: true });
    expect(response.state).toBe('SUCCESS');
  });
  test('use window object - failure', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      json: async () => ({
        error: 'Error',
      }),
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.statusText).toBe('Something went wrong');
    expect(response.state).toBe('ERROR');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Bad Request' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use window object - 400', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Error',
      }),
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.statusText).toBe('Something went wrong');
    expect(response.state).toBe('ERROR');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Bad Request' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use window object - 404', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => ({
        error: 'Error',
      }),
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.statusText).toBe('Something went wrong');
    expect(response.state).toBe('NOTFOUND');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Bad Request' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use window object - fetch throws', async () => {
    global.fetch = jest.fn(async () => {
      throw new Error();
    }) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(500);
    expect(response.statusText).toBe('');
    expect(response.state).toBe('ERROR');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Something went wrong' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use window object - fetch throws with error message', async () => {
    global.fetch = jest.fn(async () => {
      throw new Error('message');
    }) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(500);
    expect(response.statusText).toBe('');
    expect(response.state).toBe('ERROR');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'message' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use window object - json throws', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => {
        throw new Error();
      },
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(404);
    expect(response.statusText).toBe('Something went wrong');
    expect(response.state).toBe('NOTFOUND');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Bad Request' }],
    });
    expect(response.data).toBeFalsy();
  });
  test('use global object nodejs', async () => {
    // @ts-ignore
    global.window = undefined;
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => {
        throw new Error();
      },
    })) as jest.Mock;

    const response = await request('http://example.com/test').fetch();

    expect(global.fetch).toBeCalledTimes(1);
    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(404);
    expect(response.statusText).toBe('Something went wrong');
    expect(response.state).toBe('NOTFOUND');
    expect(response.error).toStrictEqual({
      kind: 'errors',
      itemsLength: 1,
      errors: [{ message: 'Bad Request' }],
    });
    expect(response.data).toBeFalsy();
  });
});
