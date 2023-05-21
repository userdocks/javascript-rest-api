import {
  defaultErrorMessage,
  defaultErrorMessages,
} from '@/defaultErrorMessage';

describe('defaultErrorMessage', () => {
  test('defaultErrorMessage - default', () => {
    const expectedResult = {
      kind: 'errors',
      itemsLength: 1,
      errors: [
        {
          message: 'Bad Request',
        },
      ],
    };

    const result = defaultErrorMessage();

    expect(result).toStrictEqual(expectedResult);
  });
  test('defaultErrorMessage - message', () => {
    const message = 'message';
    const expectedResult = {
      kind: 'errors',
      itemsLength: 1,
      errors: [
        {
          message,
        },
      ],
    };

    const result = defaultErrorMessage(message);

    expect(result).toStrictEqual(expectedResult);
  });
  test('defaultErrorMessages', () => {
    const errors = [
      {
        message: 'Bad Request',
      },
      {
        message: 'Bad Request',
      },
    ];
    const expectedResult = {
      kind: 'errors',
      itemsLength: errors.length,
      errors,
    };

    const result = defaultErrorMessages(errors);

    expect(result).toStrictEqual(expectedResult);
  });
});
