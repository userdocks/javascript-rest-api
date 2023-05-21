import { userdocks } from '@/userdocks';

describe('apps - users.accessStatus - update', () => {
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
      userdocks.apps.users.accessStatus.update(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '0',
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
      userdocks.apps.users.accessStatus.update(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '0',
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

    const response = async () =>
      userdocks.apps.users.accessStatus.update(
        'a',
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '0',
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - userId is not a uuid', async () => {
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

    const response = async () =>
      userdocks.apps.users.accessStatus.update(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        'a',
        '0',
      );

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
      userdocks.apps.users.accessStatus.update(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '0',
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - wrong accessStatus', async () => {
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

    const response = async () =>
      userdocks.apps.users.accessStatus.update(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        // @ts-ignore
        'xx',
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

    const response = await userdocks.apps.users.accessStatus.update(
      '408edd4e-ef97-49f6-8a02-7f325e897096',
      '408edd4e-ef97-49f6-8a02-7f325e897096',
      '0',
    );

    expect(response.ok).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY-TYPE']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-CLIENT-ID']).toBeTruthy();
    expect(response.data).toStrictEqual({ test: true });
  });
});
