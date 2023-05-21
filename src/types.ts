export interface User {
  id: string;
  tenantId: string;
  appId: string;
  language: string;
  salutation: 'o' | 'f' | 'm';
  salutationOther: string;
  acceptedNewsletter: boolean;
  acceptedNewsletterDate: string | null;
  lastAskedNewsletterSignUp: string | null;
  mailchimpMemberId: string | null;
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  nickname: string;
  preferred_username: string;
  profile: string;
  picture: string;
  website: string;
  email: string;
  email_verified: boolean;
  gender: string;
  birthdate: string;
  zoneinfo: string;
  locale: string;
  phone_number: string;
  phone_number_verified: string;
  updated_at: number;
  password: string;
  freezed: boolean;
  deleted: boolean;
  verified_by_admin: boolean;
  github_email_verified: boolean;
  facebook_email_verified: boolean;
  google_email_verified: boolean;
  twitter_email_verified: boolean;
  lastSignInAt: number;
  lastSignInIp: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  name: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
  type: string;
  deleted: boolean;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string | null;
  description: string | null;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  stripeTrialingPriceId: string | null;
  stripeProductId: string | null;
  stripeTrialingProductId: string | null;
  stripeSubscriptionId: string | null;
  stripeTrialingSubscriptionId: string | null;
  stripeCheckoutSessionId: string | null;
  stripeDefaultPaymentMethodId: string | null;
  stripeSubscriptionCancelAtPeriodEnd: boolean;
  stripeSubscriptionCancelAt: string | null;
  stripePaymentMethod: string | null;
  mode: string | null;
  stripeOneTimePaymentValidThru: string | null;
  freezedDueFailedPayment: boolean;
  paymentFailed: boolean;
  paymentFailedCount: number;
  paymentFailedDate: string | null;
  freezed: boolean;
  deleted: boolean;
  paidUntil: string | null;
  freeUntil: string | null;
  paidUnits: number | null;
  freeUnits: number | null;
  companyName: string | null;
  companyVATId: string | null;
  companyTaxType:
    | 'ae_trn'
    | 'au_abn'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_qst'
    | 'ch_vat'
    | 'cl_tin'
    | 'es_cif'
    | 'eu_vat'
    | 'hk_br'
    | 'id_npwp'
    | 'in_gst'
    | 'jp_cn'
    | 'jp_rn'
    | 'kr_brn'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'no_vat'
    | 'nz_gst'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'th_vat'
    | 'tw_vat'
    | 'us_ein'
    | 'za_vat';
  companyTaxExempt: 'reverse' | 'exempt' | 'none' | null;
  isBusinessCustomer: boolean;
  isInvoicePending: boolean;
  appId: string | null;
  users: User[];
  tenantAddresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicKey {
  publicKey: string;
}

export interface ApiUrl {
  url: string;
}

export interface ApiVersion {
  version: string;
}

export interface StripeMode {
  test: boolean;
}

export type ApiHeaders =
  | {
      'X-API-KEY': string;
      'X-CLIENT-ID': string;
      'X-API-KEY-TYPE': 'write' | 'read';
    }
  | {
      Authentication: string;
    };

export interface ApiOptions extends ApiUrl, ApiVersion, StripeMode {
  headers: ApiHeaders;
}
