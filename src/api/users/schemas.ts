import { z } from 'zod';
import { countries } from '@/api/enums/countries';
import { salutations } from '@/api/enums/salutations';

export const userIdSchema = z.string().uuid();

export const userEmailSchema = z.string().email();

export const userMeSchema = z.string().regex(/me/);

export const promotionCodeSchema = z.string().min(1);

export const createReferralInviteSchema = z.object({
  email: z.string().email(),
  language: z.enum(countries),
});

export const updateUserSchema = z.object({
  language: z.enum(countries).optional(),
  salutation: z.enum(salutations).optional(),
  salutationOther: z.string().max(256).optional(),
  acceptedNewsletter: z.boolean().optional(),
  name: z.string().max(256).optional(),
  given_name: z.string().max(256).optional(),
  family_name: z.string().max(256).optional(),
  middle_name: z.string().max(256).optional(),
  nickname: z.string().max(256).optional(),
  preferred_username: z.string().max(256).optional(),
  profile: z.string().max(256).optional(),
  picture: z.string().max(256).optional(),
  website: z.string().max(256).optional(),
  email: z.string().max(512).optional(),
  gender: z.string().max(256).optional(),
  birthdate: z.date().optional(),
  zoneinfo: z.string().optional(),
  locale: z.string().optional(),
  phone_number: z.string().max(256).optional(),
});
