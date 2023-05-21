import { z } from 'zod';
import { generateUuid } from '@/generateUuid';

describe('generateUuid', () => {
  test('generate', () => {
    const uuid = generateUuid();

    expect(z.string().uuid().safeParse(uuid)).toBeTruthy();
  });
});
