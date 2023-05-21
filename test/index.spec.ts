import { userdocks } from '@/userdocks';

describe('userdocks', () => {
  test('fails - can not call rest api befor einitializing', async () => {
    const result = async () =>
      userdocks.analytics.oneTimePayments.list('2022-12-12', '2022-12-14');

    await expect(result()).rejects.toThrow();
  });
  test('initialize fails invalid url', async () => {
    const result = async () =>
      userdocks.initialize(
        {
          Authentication: 'Bearer Token',
        },
        {
          url: 'h',
          version: 'v1',
          test: true,
        },
      );

    await expect(result()).rejects.toThrow();
  });
  test('initialize fails invalid version', async () => {
    const result = async () =>
      userdocks.initialize(
        {
          Authentication: 'Bearer Token',
        },
        {
          url: 'http://example.com',
          version: 'xx',
          test: true,
        },
      );

    await expect(result()).rejects.toThrow();
  });
  test('initialize fails invalid test', async () => {
    const result = async () =>
      userdocks.initialize(
        {
          Authentication: 'Bearer Token',
        },
        {
          url: 'http://example.com',
          version: 'v1',
          // @ts-ignore
          test: 'xx',
        },
      );

    await expect(result()).rejects.toThrow();
  });
});
