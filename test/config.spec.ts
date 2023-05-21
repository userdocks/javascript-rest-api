import { baseHeaders, config } from '@/config';

describe('config', () => {
  test('baseHeader - allows server side API KEY headers', () => {
    const expectedResult = {
      'Content-Type': 'application/json',
      'X-API-KEY': 'a',
      'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096',
      'X-API-KEY-TYPE': 'read',
    };

    const result = baseHeaders({
      'X-API-KEY': 'a',
      'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096',
      'X-API-KEY-TYPE': 'read',
    });

    expect(result).toStrictEqual(expectedResult);
  });
  test('baseHeader - allows client side Bearer headers', () => {
    const expectedResult = {
      'Content-Type': 'application/json',
      Authentication: 'a',
    };

    const result = baseHeaders({
      Authentication: 'a',
    });

    expect(result).toStrictEqual(expectedResult);
  });
  test('config - allows server side API KEY headers', () => {
    const expectedResult = {
      url: 'https://api.userdocks.com',
      version: 'v1',
      test: true,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'a',
        'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096 ',
        'X-API-KEY-TYPE': 'write',
      },
    };

    const result = config({
      'X-API-KEY': 'a',
      'X-CLIENT-ID': '408edd4e-ef97-49f6-8a02-7f325e897096 ',
      'X-API-KEY-TYPE': 'write',
    });

    expect(result).toStrictEqual(expectedResult);
  });
  test('config - allows client side Bearer headers', () => {
    const expectedResult = {
      url: 'https://api.userdocks.com',
      version: 'v1',
      test: true,
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'a',
      },
    };

    const result = config({
      Authentication: 'a',
    });

    expect(result).toStrictEqual(expectedResult);
  });
});
