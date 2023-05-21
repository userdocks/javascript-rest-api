import { userdocks } from '@/userdocks';

describe('apps - publicKeys - retrieve', () => {
  beforeEach(() => {
    // @ts-ignore
    global.window = global;
  });
  afterEach(() => {
    // @ts-ignore
    global.window = undefined;
  });
  test('fails - can only be used with api key', async () => {
    await userdocks.initialize(
      {
        Authentication: 'Bearer Token',
      },
      {
        url: 'http://example.com',
        version: 'v1',
        test: true,
      },
    );

    const response = async () =>
      userdocks.apps.publicKeys.retrieve(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - can only be used on the server (we use the window set to an object to simulate client side)', async () => {
    await userdocks.initialize(
      {
        'X-API-KEY': 'KEY',
        'X-API-KEY-TYPE': 'read',
        'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096',
      },
      {
        url: 'http://example.com',
        version: 'v1',
        test: true,
      },
    );

    const response = async () =>
      userdocks.apps.publicKeys.retrieve(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - appId is not a uuid', async () => {
    // @ts-ignore
    global.window = undefined;
    await userdocks.initialize(
      {
        'X-API-KEY': 'KEY',
        'X-API-KEY-TYPE': 'read',
        'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096',
      },
      {
        url: 'http://example.com',
        version: 'v1',
        test: true,
      },
    );

    const response = async () => userdocks.apps.publicKeys.retrieve('a');

    await expect(response()).rejects.toThrow();
  });
  test('fails - can only be used with api key headers', async () => {
    // @ts-ignore
    global.window = undefined;
    await userdocks.initialize(
      {
        Authentication: 'Bearer Token',
      },
      {
        url: 'http://example.com',
        version: 'v1',
        test: true,
      },
    );

    const response = async () =>
      userdocks.apps.publicKeys.retrieve(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
      );

    await expect(response()).rejects.toThrow();
  });
  test('success', async () => {
    // @ts-ignore
    global.window = undefined;
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
    await userdocks.initialize(
      {
        'X-API-KEY': 'KEY',
        'X-API-KEY-TYPE': 'read',
        'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096',
      },
      {
        url: 'http://example.com',
        version: 'v1',
        test: true,
      },
    );

    const response = await userdocks.apps.publicKeys.retrieve(
      '408edd4e-ef97-49f6-8a02-7f325e897096',
    );

    expect(response.ok).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY-TYPE']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-CLIENT-ID']).toBeTruthy();
    expect(response.data).toStrictEqual({ test: true });
  });
});
