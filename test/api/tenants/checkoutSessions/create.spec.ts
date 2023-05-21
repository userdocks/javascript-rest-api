import { userdocks } from '@/userdocks';

describe('tenants - checkoutSessions - create', () => {
  beforeEach(() => {
    // @ts-ignore
    global.window = global;
  });
  afterEach(() => {
    // @ts-ignore
    global.window = undefined;
  });
  test('fails - can not be used on be used on the client with API KEYS (we use the window object set to global to simulate client side)', async () => {
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
      userdocks.tenants.checkoutSessions.create(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        {
          price: 'price_78768978798',
          taxRate: 'txr_78686786867',
          allowedCountry: 'DE',
          paymentMethodType: 'card',
          billingAddressCollection: true,
          mode: 'payment',
          quantity: 1,
          isReverseCharge: false,
          state:
            '1234567890123456789012345678901234567890123456789012345678901234',
          test: true,
        },
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - tenantId is not a uuid', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
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
      userdocks.tenants.checkoutSessions.create('a', {
        price: 'price_78768978798',
        taxRate: 'txr_78686786867',
        allowedCountry: 'DE',
        paymentMethodType: 'card',
        billingAddressCollection: true,
        mode: 'payment',
        quantity: 1,
        isReverseCharge: false,
        state:
          '1234567890123456789012345678901234567890123456789012345678901234',
        test: true,
      });

    await expect(response()).rejects.toThrow();
  });
  test('fails - price is not a stripeId', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
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
      userdocks.tenants.checkoutSessions.create(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        {
          price: 'a',
          taxRate: 'txr_78686786867',
          allowedCountry: 'DE',
          paymentMethodType: 'card',
          billingAddressCollection: true,
          mode: 'payment',
          quantity: 1,
          isReverseCharge: false,
          state:
            '1234567890123456789012345678901234567890123456789012345678901234',
          test: true,
        },
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - taxRate is not a stripeId', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
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
      userdocks.tenants.checkoutSessions.create(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        {
          price: 'price_78768978798',
          taxRate: 'a',
          allowedCountry: 'DE',
          paymentMethodType: 'card',
          billingAddressCollection: true,
          mode: 'payment',
          quantity: 1,
          isReverseCharge: false,
          state:
            '1234567890123456789012345678901234567890123456789012345678901234',
          test: true,
        },
      );

    await expect(response()).rejects.toThrow();
  });
  test('fails - state is not a 64 characters long', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
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
      userdocks.tenants.checkoutSessions.create(
        '408edd4e-ef97-49f6-8a02-7f325e897096',
        {
          price: 'price_78768978798',
          taxRate: 'txr_78686786867',
          allowedCountry: 'DE',
          paymentMethodType: 'card',
          billingAddressCollection: true,
          mode: 'payment',
          quantity: 1,
          isReverseCharge: false,
          state: '12345678901234567890123456789012345678901234567890123456789',
          test: true,
        },
      );

    await expect(response()).rejects.toThrow();
  });
  test('succeeds - can be used with bearer token on client', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ test: true }),
    })) as jest.Mock;
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

    const response = await userdocks.tenants.checkoutSessions.create(
      '408edd4e-ef97-49f6-8a02-7f325e897096',
      {
        price: 'price_78768978798',
        taxRate: 'txr_78686786867',
        allowedCountry: 'DE',
        paymentMethodType: 'card',
        billingAddressCollection: true,
        mode: 'payment',
        quantity: 1,
        isReverseCharge: false,
        state:
          '1234567890123456789012345678901234567890123456789012345678901234',
        test: true,
      },
    );

    expect(response.ok).toBeTruthy();
    expect((response.options as any)?.headers?.Authentication).toBeTruthy();
    expect(response.data).toStrictEqual({ test: true });
  });
  test('succeeds - can be used with api key on the server (we use the window object set tp undefined to simulate server side)', async () => {
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

    const response = await userdocks.tenants.checkoutSessions.create(
      '408edd4e-ef97-49f6-8a02-7f325e897096',
      {
        price: 'price_78768978798',
        taxRate: 'txr_78686786867',
        allowedCountry: 'DE',
        paymentMethodType: 'card',
        billingAddressCollection: true,
        mode: 'payment',
        quantity: 1,
        isReverseCharge: false,
        state:
          '1234567890123456789012345678901234567890123456789012345678901234',
        test: true,
      },
    );

    expect(response.ok).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-API-KEY-TYPE']).toBeTruthy();
    expect((response.options as any)?.headers?.['X-CLIENT-ID']).toBeTruthy();
    expect(response.data).toStrictEqual({ test: true });
  });
});
