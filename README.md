# **@userdocks/javascript-rest-api**

![npm](https://img.shields.io/npm/v/@userdocks/javascript-rest-api?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/userdocks/javascript-rest-api/ci.yml?branch=main&style=flat-square)
![Coveralls branch](https://img.shields.io/coveralls/github/userdocks/javascript-rest-api/main?style=flat-square)
![NPM](https://img.shields.io/npm/l/@userdocks/javascript-rest-api?style=flat-square)

> Call the userdocks REST API via the JavaScript rest function (node + browser)

## **Table of Contents**

- [Install](#install)
- [Methods](#methods)
  - [userdocks.initialize](#userdocksinitialize)
  - [userdocks.analytics.oneTimePayments.list](#userdocksanalyticsonetimepaymentslist)
  - [userdocks.analytics.signIns.list](#userdocksanalyticssigninslist)
  - [userdocks.analytics.subscriptions.list](#userdocksanalyticssubscriptionslist)
  - [userdocks.analytics.tenants.list](#userdocksanalyticstenantslist)
  - [userdocks.apps.promotions.list](#userdocksappspromotionslist)
  - [userdocks.apps.publicKeys.retrieve](#userdocksappspublickeysretrieve)
  - [userdocks.apps.userRoles.list](#userdocksappsuserroleslist)
  - [userdocks.apps.users.accessStatus.update](#userdocksappsusersaccessstatusupdate)
  - [userdocks.tenants.checkoutSessions.create](#userdockstenantscheckoutsessionscreate)
  - [userdocks.tenants.stripe.invoices.list](#userdockstenantsstripeinvoiceslist)
  - [userdocks.tenants.stripe.invoices.create](#userdockstenantsstripeinvoicescreate)
  - [userdocks.tenants.stripe.paymentMethods.del](#userdockstenantsstripepaymentmethodsdel)
  - [userdocks.tenants.stripe.subscriptions.del](#userdockstenantsstripesubscriptionsdel)
  - [userdocks.tenants.stripe.subscriptions.update](#userdockstenantsstripesubscriptionsupdate)
  - [userdocks.tenants.retrieve](#userdockstenantsretrieve)
  - [userdocks.tenants.update](#userdockstenantsupdate)
  - [userdocks.users.retrieve](#userdocksusersretrieve)
  - [userdocks.users.update](#userdocksusersupdate)
  - [userdocks.users.del](#userdocksusersdel)
  - [userdocks.users.promotionCodes.use](#userdocksuserspromotioncodesuse)
  - [userdocks.users.referralInvites.create](#userdocksusersreferralinvitescreate)
- [Usage](#usage)
- [Usage for Development](#usage-for-development)

## **Install**

```bash
npm i @userdocks/javascript-rest-api
```

## **Methods**

Documentation of all the functions and methods this SDK exposes.

### **userdocks.initialize**

This method must be called before using any other methods.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.initialize(headers, options);
```

#### **Parameters**

* headers `<object>`: an object holding either the api key headers (server-only) or an authentication header (client-only)
  * X-API-KEY `<string>`: the readOnly or writeOnly api key for userdocks (server-only)
  * X-CLIENT-ID `<string>`: the id of the userdocks app (server-only)
  * X-API-KEY-TYPE `<'write' | 'read'>`: type of the api key (server-only)
  * Authentication `<string>`: an accesstoken for userdocks `Bearer x.y.z` (client-only)
* options `<object>`: an object holding three keys
  * url `<string>`: the url of the api server (default: https://api.userdocks.com)
  * version `<string>`: the version of the api server (default: v1)
  * test `<boolean>`: an boolean indicating the mode for the stripe payment api (default: true)

#### **Return value**

* object `<object>`: an object holdiung three keys
  * options `<object>`: an object holding four keys
    * url `<string>`: the url of the api server (default: https://api.userdocks.com)
    * version `<string>`: the version of the api server (default: v1)
    * test `<boolean>`: an boolean indicating the mode for the stripe payment api (default: true)
    * headers `<object>`: an object holding either the api key headers (server-only) or an authentication header (client-only)
      * X-API-KEY `<string>`: the readOnly or writeOnly api key for userdocks (server-only)
      * X-CLIENT-ID `<string>`: the id of the userdocks app (server-only)
      * X-API-KEY-TYPE `<'write' | 'read'>`: type of the api key (server-only)
      * Authentication `<string>`: an accesstoken for userdocks `Bearer x.y.z` (client-only)
    * version `<string>`: an uuid created when initialized the userdocks api
    * isServer `<boolean>`: an boolean indicating if the api is used on the server or on the client

### **userdocks.analytics.oneTimePayments.list**

This method will return all one-time payments for an application between a two dates and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.analytics.oneTimePayments.list(from, to);
```

#### Parameters

* from `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`
* to `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`

#### **Return value**

```js
// GET /v1/analytics/one-time-payments
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "analyticsOneTimePayment",
    "itemsLength": Number,
    "items": [
      {
        "id": String,
        "paid": Boolean,
        "test": Boolean,
        "stripePriceId": String,
        "units": Number,
        "unitsBefore": Number,
        "stripeCustomerId": String,
        "stripeCouponId": String,
        "mailchimpMemberId": String,
        "user": {
          "id": String,
          "appId":  String,
          "language": String,
          "salutation": String,
          "salutationOther": String,
          "acceptedNewsletter": Boolean,
          "acceptedNewsletterDate": String,
          "lastAskedNewsletterSignUp": String,
          "mailchimpMemberId": String,
          "name": String,
          // open id fields use snake case
          "given_name": String,
          "family_name": String,
          "middle_name": String,
          "nickname": String,
          "preferred_username": String,
          "profile": String,
          "picture": String,
          "website": String,
          "email": String,
          "email_verified": Boolean,
          "gender": String,
          "other_gender": String,
          "birthdate": String,
          "zoneinfo": String,
          "locale": String,
          "phone_number": String,
          "phone_number_verified": Boolean,
          "freezed": Boolean,
          "deleted": Boolean,
          "tenantId": Boolean,
          "tenant": {
            "id": String,
            "name": String,
            "stripeCustomerId": String,
            "stripePriceId": String,
            "stripeProductId": String,
            "stripeSubscriptionId": String,
            "stripeTrialingPriceId": String,
            "stripeTrialingProductId": String,
            "stripeTrialingSubscriptionId": String,
            "stripeCheckoutSessionId": String,
            "stripeDefaultPaymentMethodId": String,
            "stripeSubscriptionCancelAtPeriodEnd": Boolean,
            "stripeSubscriptionCancelAt": String,
            "stripePaymentMethod": String, // 'card' or 'userdocks_promo_code' or somthing with 'promo' specified by the user
            "mode": String,// 'payment' or 'subscription'
            "description": String,
            "stripeOneTimePaymentValidThru": String,
            "freezedDueFailedPayment": Boolean,
            "paidUntil": String,
            "freeUntil": String,
            "paidUnits": String,
            "freeUnits": String,
            "companyName": String,
            "companyVATId": String, // value added tax identification number
            "companyTaxType": String,
            "companyTaxExempt": String, // none, exempt or reverse
            "isBusinessCustomer": Boolean,
            "isInvoicePending": Boolean,
            "freezed": Boolean,
            "paymentFailed": Boolean,
            "paymentFailedCount": Number,
            "paymentFailedDate": String,
            "deleted": Boolean,
          }
        }
      },
    ]
  }
}
```

### **userdocks.analytics.signIns.list**

This method will return all sign ins for an application between a two dates and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.analytics.signIns.list(from, to);
```

#### **Parameters**

* from `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`
* to `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`

#### **Return value**

```js
// GET /api/v1/analytics/sign-ins
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "analyticsSignIn",
    "itemsLength": Number,
    "items": [
      {
        "id": String,
        "lastSignInAt": String,
        "daysSinceLastSignIn": String,
        "mailchimpMemberId": String,
        "user": {
          "id": String,
          "appId":  String,
          "language": String,
          "salutation": String,
          "salutationOther": String,
          "acceptedNewsletter": Boolean,
          "acceptedNewsletterDate": String,
          "lastAskedNewsletterSignUp": String,
          "mailchimpMemberId": String,
          "name": String,
          // open id fields use snake case
          "given_name": String,
          "family_name": String,
          "middle_name": String,
          "nickname": String,
          "preferred_username": String,
          "profile": String,
          "picture": String,
          "website": String,
          "email": String,
          "email_verified": Boolean,
          "gender": String,
          "other_gender": String,
          "birthdate": String,
          "zoneinfo": String,
          "locale": String,
          "phone_number": String,
          "phone_number_verified": Boolean,
          "freezed": Boolean,
          "deleted": Boolean,
          "tenantId": Boolean,
          "tenant": {
            "id": String,
            "name": String,
            "stripeCustomerId": String,
            "stripePriceId": String,
            "stripeProductId": String,
            "stripeSubscriptionId": String,
            "stripeTrialingPriceId": String,
            "stripeTrialingProductId": String,
            "stripeTrialingSubscriptionId": String,
            "stripeCheckoutSessionId": String,
            "stripeDefaultPaymentMethodId": String,
            "stripeSubscriptionCancelAtPeriodEnd": Boolean,
            "stripeSubscriptionCancelAt": String,
            "stripePaymentMethod": String, // 'card' or 'userdocks_promo_code' or somthing with 'promo' specified by the user
            "mode": String,// 'payment' or 'subscription'
            "description": String,
            "stripeOneTimePaymentValidThru": String,
            "freezedDueFailedPayment": Boolean,
            "paidUntil": String,
            "freeUntil": String,
            "paidUnits": String,
            "freeUnits": String,
            "companyName": String,
            "companyVATId": String, // value added tax identification number
            "companyTaxType": String,
            "companyTaxExempt": String, // none, exempt or reverse
            "isBusinessCustomer": Boolean,
            "isInvoicePending": Boolean,
            "freezed": Boolean,
            "paymentFailed": Boolean,
            "paymentFailedCount": Number,
            "paymentFailedDate": String,
            "deleted": Boolean,
          }
        }
      },
    ]
  }
}
```

### **userdocks.analytics.subscriptions.list**

This method will return all subscriptions for an application between a two dates and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.analytics.subscriptions.list(from, to);
```

#### **Parameters**

* from `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`
* to `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`

#### **Return value**

```js
// GET /v1/analytics/subscriptions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "analyticsSubscription",
    "itemsLength": Number,
    "items": [
      {
        "id": String,
        "paid": Boolean,
        "test": Boolean,
        "until": Number,
        "cancelled": Boolean,
        "stripeSubscriptionId": String,
        "stripePriceId": String,
        "stripeCustomerId": String,
        "stripeCouponId": String,
        "userId": String,
        "mailchimpMemberId": String,
        "appId": String,
        "tenantId": String,
        "user": {
          "id": String,
          "appId":  String,
          "language": String,
          "salutation": String,
          "salutationOther": String,
          "acceptedNewsletter": Boolean,
          "acceptedNewsletterDate": String,
          "lastAskedNewsletterSignUp": String,
          "mailchimpMemberId": String,
          "name": String,
          // open id fields use snake case
          "given_name": String,
          "family_name": String,
          "middle_name": String,
          "nickname": String,
          "preferred_username": String,
          "profile": String,
          "picture": String,
          "website": String,
          "email": String,
          "email_verified": Boolean,
          "gender": String,
          "other_gender": String,
          "birthdate": String,
          "zoneinfo": String,
          "locale": String,
          "phone_number": String,
          "phone_number_verified": Boolean,
          "freezed": Boolean,
          "deleted": Boolean,
          "tenantId": Boolean,
          "tenant": {
            "id": String,
            "name": String,
            "stripeCustomerId": String,
            "stripePriceId": String,
            "stripeProductId": String,
            "stripeSubscriptionId": String,
            "stripeTrialingPriceId": String,
            "stripeTrialingProductId": String,
            "stripeTrialingSubscriptionId": String,
            "stripeCheckoutSessionId": String,
            "stripeDefaultPaymentMethodId": String,
            "stripeSubscriptionCancelAtPeriodEnd": Boolean,
            "stripeSubscriptionCancelAt": String,
            "stripePaymentMethod": String, // 'card' or 'userdocks_promo_code' or somthing with 'promo' specified by the user
            "mode": String,// 'payment' or 'subscription'
            "description": String,
            "stripeOneTimePaymentValidThru": String,
            "freezedDueFailedPayment": Boolean,
            "paidUntil": String,
            "freeUntil": String,
            "paidUnits": String,
            "freeUnits": String,
            "companyName": String,
            "companyVATId": String, // value added tax identification number
            "companyTaxType": String,
            "companyTaxExempt": String, // none, exempt or reverse
            "isBusinessCustomer": Boolean,
            "isInvoicePending": Boolean,
            "freezed": Boolean,
            "paymentFailed": Boolean,
            "paymentFailedCount": Number,
            "paymentFailedDate": String,
            "deleted": Boolean,
          }
        }
      },
    ]
  }
}
```

### **userdocks.analytics.tenants.list**

This method will return all subscriptions for an application between a two dates and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.analytics.subscriptions.list(from, to);
```

#### **Parameters**

* from `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`
* to `<string>`: a date in the follwing format `YYYY-MM-DD` e.g. `2022-31-12`

#### **Return value**

```js
// GET /v1/analytics/tenants
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "analyticsTenant",
    "itemsLength": Number,
    "items": [
      {
        id: String,
        name: String,
        stripeCustomerId: String,
        stripePriceId: String,
        stripeProductId: String,
        stripeSubscriptionId: String,
        stripeTrialingPriceId: String,
        stripeTrialingProductId: String,
        stripeTrialingSubscriptionId: String,
        stripeCheckoutSessionId: String,
        stripeDefaultPaymentMethodId: String,
        stripeSubscriptionCancelAtPeriodEnd: Boolean,
        stripeSubscriptionCancelAt: String,
        stripePaymentMethod: String, // 'card' or 'userdocks_promo_code' or somthing with 'promo' specified by the user
        mode: String,// 'payment' or 'subscription'
        description: String,
        stripeOneTimePaymentValidThru: String,
        freezedDueFailedPayment: Boolean,
        paidUntil: String,
        freeUntil: String,
        paidUnits: String,
        freeUnits: String,
        companyName: String,
        companyVATId: String, // value added tax identification number
        companyTaxType: String,
        companyTaxExempt: String, // none, exempt or reverse
        isBusinessCustomer: Boolean,
        isInvoicePending: Boolean,
        freezed: Boolean,
        paymentFailed: Boolean,
        paymentFailedCount: Number,
        paymentFailedDate: String,
        deleted: Boolean,
        tenantAddresses: [
          {
            id: String,
            name: String,
            city: String,
            country: String,
            line1: String,
            line2: String,
            postal_code: String,
            state: String,
            type: String,
            deleted: Boolean,
          }
        ],
        users: [
          {
            id: String,
            appId:  String,
            language: String,
            salutation: String,
            salutationOther: String,
            acceptedNewsletter: Boolean,
            acceptedNewsletterDate: String,
            lastAskedNewsletterSignUp: String,
            mailchimpMemberId: String,
            name: String,
            // open id fields use snake case
            given_name: String,
            family_name: String,
            middle_name: String,
            nickname: String,
            preferred_username: String,
            profile: String,
            picture: String,
            website: String,
            email: String,
            email_verified: Boolean,
            gender: String,
            other_gender: String,
            birthdate: String,
            zoneinfo: String,
            locale: String,
            phone_number: String,
            phone_number_verified: Boolean,
            password: String,
            freezed: Boolean,
            deleted: Boolean,
            verified_by_admin: Boolean,
            github_email_verified: Boolean,
            google_email_verified: Boolean,
            facebook_email_verified: Boolean,
            twitter_email_verified: Boolean,
            lastSignInAt: Boolean,
            lastSignInIp: Boolean,
            tenantId: Boolean,
          }
        ]
      }
    ]
  }
}
```

### **userdocks.apps.promotions.list**

This method will return all promotions for an application and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.apps.promotions.list(appId);
```

#### **Parameters**

* appId `<string>`: the id of an userdocks application (uuid)

#### **Return value**

```js
// GET /v1/apps/:appId/promotions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "promotion",
    "itemsLength": Number,
    "items": [
      {}
    ]
  }
}
```

### **userdocks.apps.publicKeys.retrieve**

This method will return the public key for an application and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.apps.publicKeys.retrieve(appId);
```

#### **Parameters**

* appId `<string>`: the id of an userdocks application (uuid)

#### **Return value**

```js
// GET /v1/apps/:appId/public-keys
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "publicKey",
    "publicKey": String
  }
}
```

### **userdocks.apps.userRoles.list**

This method will return all user roles for an application and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.apps.userRoles.list(appId);
```

#### **Parameters**

* appId `<string>`: the id of an userdocks application (uuid)

#### **Return value**

```js
// GET /v1/apps/:appId/user-roles
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "userRole",
    "itemsLength": Number,
    "items":[
      {
        id: String,
        name: String,
      },
    ],
  },
}
```

### **userdocks.apps.users.accessStatus.update**

This method will update the access status (freezed, unfreezed) of an user for an application and can only be accessed from the server with api keys.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.apps.users.accessStatus.update(appId, userId, accessStatus);
```

#### **Parameters**

* appId `<string>`: the id of an userdocks application (uuid)
* userId `<string>`: the id of an userdocks user (uuid)
* accessStatus `<string>`: '0' - freezed (unable to sign in); '1' - unfreezed (able to sign in)

#### **Return value**

```js
// POST /v1/apps/:appId/users/:userId/access-status/:accessStatus
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.tenants.checkoutSessions.create**

This method will create a new checkout session (used to redirect to the payment page).

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.checkoutSession.create(tenantId, checkoutSession);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)
* checkouSession `<object>`: holding up to 10 keys
  * price `<string>`: a stripe price id
  * taxRate `<string>`: a stripe tax rate id
  * allowedCountry `<string>`: a two character country code e.g. US
  * paymentMethodType `<'card' | 'sepa' | 'sofort'>`
  * billingAddressCollection `<boolean>`
  * mode `<'payment' | 'subscription' | 'setup'>`
  * quantity `<number>`
  * isReverseCharge `<boolean>`
  * state `<string>`: 64 character long random string
  * test? `<boolean>`: indicates if using the stripe payment api in testmode (optional)

#### **Return value**

```js
// POST /v1/tenants/:tenantId/checkout-sessions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "checkoutSession",
    "id": String,
    "hash": String,
    "nextAction": {
      url: String, // the url to the payment page (you need to add the state as query parameter)
    }
  }
}
```

### **userdocks.tenants.stripe.invoices.list**

This method will list all stripe invoices for a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.stripe.invoices.list(tenantId);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)

#### **Return value**

```js
// GET /v1/tenants/:tenantId/stripe-invoices
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.tenants.stripe.invoices.create**

This method will create a new stripe invoice for a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.stripe.invoices.create(tenantId, stripeInvoice);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)
* stripeInvoice `<object>`: holding up to eight keys
  * price `<string>`: a stripe price id
  * taxRate `<string>`: a stripe tax rate id
  * quantity `<number>`
  * tenantId `<string>`: the id of an userdocks tenant (uuid)
  * userId `<string>`: the id of an userdocks user (uuid)
  * mode `<'payment' | 'subscription' | 'setup'>`
  * footer? `<string>`: text that should appear on the invoice (optional)
  * test? `<boolean>`: indicates if using the stripe payment api in testmode (optional)

#### **Return value**

```js
// POST /v1/tenants/:tenantId/stripe-invoices
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "stripePaymentIntent",
    // https://stripe.com/docs/api/payment_intents/object?lang=node
  },
}
```

### **userdocks.tenants.stripe.paymentMethods.del**

This method will delete all stripe payment methods for a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.stripe.paymentMethods.del(tenantId);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)

#### **Return value**

```js
// DELETE /v1/tenants/:tenantId/stripe-payment-methods
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.tenants.stripe.subscriptions.del**

This method will delete all stripe subscriptions for a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.stripe.susbcriptions.del(tenantId);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)

#### **Return value**

```js
// DELETE /v1/tenants/:tenantId/stripe-subscriptions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.tenants.stripe.subscriptions.update**

This method will upgrade or downgrade an stripe subscription for a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.stripe.susbcriptions.update(tenantId, stripeSubscription);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)
* tenantId `<string>`: an object holding up to six keys
  * price `<string>`: a stripe price id
  * taxRate `<string>`: a stripe tax rate id
  * quantity `<number>`
  * tenantId `<string>`: the id of an userdocks tenant (uuid)
  * userId `<string>`: the id of an userdocks user (uuid)
  * test? `<boolean>`: indicates if using the stripe payment api in testmode (optional)

#### **Return value**

```js
// PUT /v1/tenants/:tenantId/stripe-subscriptions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.tenants.retireve**

This method will return a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.retrieve(tenantId);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)

#### **Return value**

```js
// GET /v1/tenants/:tenantId
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "tenant",
    "id": String,
    "name": String,
    "stripeCustomerId": String,
    "stripePriceId": String,
    "stripeProductId": String,
    "stripeSubscriptionId": String,
    "stripeTrialingPriceId": String,
    "stripeTrialingProductId": String,
    "stripeTrialingSubscriptionId": String,
    "stripeCheckoutSessionId": String,
    "stripeDefaultPaymentMethodId": String,
    "stripeSubscriptionCancelAtPeriodEnd": Boolean,
    "stripeSubscriptionCancelAt": String,
    "stripePaymentMethod": String, // 'card' or 'userdocks_promo_code' or somthing with 'promo' specified by the user
    "mode": String,// 'payment' or 'subscription'
    "description": String,
    "stripeOneTimePaymentValidThru": String,
    "freezedDueFailedPayment": Boolean,
    "paidUntil": String,
    "freeUntil": String,
    "paidUnits": String,
    "freeUnits": String,
    "companyName": String,
    "companyVATId": String, // value added tax identification number
    "companyTaxType": String,
    "companyTaxExempt": String, // none, exempt or reverse
    "isBusinessCustomer": Boolean,
    "isInvoicePending": Boolean,
    "freezed": Boolean,
    "paymentFailed": Boolean,
    "paymentFailedCount": Number,
    "paymentFailedDate": String,
    "deleted": Boolean,
    "shippingAddress": {
      "id": String,
      "name": String,
      "city": String,
      "country": String,
      "line1": String,
      "line2": String,
      "postal_code": String,
      "state": String,
      "type": String,
      "deleted": Boolean
    },
    "billingAddress": {
      "id": String,
      "name": String,
      "city": String,
      "country": String,
      "line1": String,
      "line2": String,
      "postal_code": String,
      "state": String,
      "type": String,
      "deleted": Boolean
    },
    "users": [
      {
        "id": String,
        "appId":  String,
        "language": String,
        "salutation": String,
        "salutationOther": String,
        "acceptedNewsletter": Boolean,
        "acceptedNewsletterDate": String,
        "lastAskedNewsletterSignUp": String,
        "mailchimpMemberId": String,
        "name": String,
        // open id fields use snake case
        "given_name": String,
        "family_name": String,
        "middle_name": String,
        "nickname": String,
        "preferred_username": String,
        "profile": String,
        "picture": String,
        "website": String,
        "email": String,
        "email_verified": Boolean,
        "gender": String,
        "other_gender": String,
        "birthdate": String,
        "zoneinfo": String,
        "locale": String,
        "phone_number": String,
        "phone_number_verified": Boolean,
        "freezed": Boolean,
        "deleted": Boolean,
        "verified_by_admin": Boolean,
        "github_email_verified": Boolean,
        "google_email_verified": Boolean,
        "facebook_email_verified": Boolean,
        "twitter_email_verified": Boolean,
        "lastSignInAt": Boolean,
        "lastSignInIp": Boolean,
        "tenantId": Boolean
      }
    ]
  }
}
```

### **userdocks.tenants.update**

This method will update a userdocks tenant.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.tenants.retrieve(tenantId, tenant);
```

#### **Parameters**

* tenantId `<string>`: the id of an userdocks tenant (uuid)
* tenant `<object>`: all values are optional
  * name `<string>`
  * description`<string>`
  * companyName`<string>`
  * companyVATId`<string>`
  * companyTaxType`<string>`
  * companyTaxExempt `<'none' | 'exempt' | 'reverse'>`
  * isBusinessCustomer `<boolean>`
  * shippingAddress `<object>`:
    * name `<string>`
    * city `<string>`
    * country `<string>`: a two character country code e.g. US
    * line1 `<string>`
    * line2 `<string>`
    * postal_code `<string>`
    * state `<string>`
    * type `<string>`
  * billingAddress `<object>`:
    * name `<string>`
    * city `<string>`
    * country `<string>`: a two character country code e.g. US
    * line1 `<string>`
    * line2 `<string>`
    * postal_code `<string>`
    * state `<string>`
    * type `<string>`

#### **Return value**

```js
// PUT /v1/tenants/:tenantId
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.users.retrieve**

This method will return a userdocks user.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.users.retrieve(userId);
```

#### **Parameters**

* userId `<string>`: the id of an userdocks user (uuid)

#### **Return value**

```js
// GET /v1/users
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "user",
    "id": String,
    "appId":  String,
    "language": String,
    "salutation": String,
    "salutationOther": String,
    "acceptedNewsletter": Boolean,
    "acceptedNewsletterDate": String,
    "lastAskedNewsletterSignUp": String,
    "mailchimpMemberId": String,
    "name": String,
    // open id fields use snake case
    "given_name": String,
    "family_name": String,
    "middle_name": String,
    "nickname": String,
    "preferred_username": String,
    "profile": String,
    "picture": String,
    "website": String,
    "email": String,
    "email_verified": Boolean,
    "gender": String,
    "other_gender": String,
    "birthdate": String,
    "zoneinfo": String,
    "locale": String,
    "phone_number": String,
    "phone_number_verified": Boolean,
    "freezed": Boolean,
    "deleted": Boolean,
    "tenantId": Boolean
  }
}
```

### **userdocks.users.update**

This method will update a userdocks user.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.users.retrieve(userId, user);
```

#### **Parameters**

* userId `<string>`: the id of an userdocks user (uuid)
* user `<object>`: all values are optional
  language: `<string>`: a two character country code e.g. US
  salutation `<'o' | 'f' | 'm'>`
  salutationOther `<string>`
  acceptedNewsletter `<boolean>`
  name `<string>`
  given_name `<string>`
  family_name `<string>`
  middle_name `<string>`
  nickname `<string>`
  preferred_username `<string>`
  profile `<string>`
  picture `<string>`
  website `<string>`
  email `<string>`
  gender `<string>`
  birthdate `<string>`: YYYY-MM-DD e.g. 2022-31-12
  zoneinfo `<string>`
  locale `<string>`
  phone_number `<string>`

#### **Return value**

```js
// POST /v1/users/:userId
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null
}
```

### **userdocks.users.del**

This method will delete a userdocks user.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.users.retrieve(userId);
```

#### **Parameters**

* userId `<string>`: the id of an userdocks user (uuid)

#### **Return value**

```js
// DELETE /v1/users/:userId
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

### **userdocks.users.promotionCodes.use**

This method will use a userdocks promotion code for a user (e.g. price or subscription for free).

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.users.promotionCodes.use(userId, promotionCode);
```

#### **Parameters**

* userId `<string>`: the id of an userdocks user (uuid)
* promotionCode `<string>`: a userdocks promotion code

#### **Return value**

```js
// PUT /v1/users/:userId/promotion-codes/:promotionCode
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null
}
```

### **userdocks.users.referralInvites.create**

This method invite a new user based on an email address.

#### **Syntax**

Returns a promise

```js
import userdocks from '@userdocks/javascript-rest-api';

await userdocks.users.promotionCodes.use(userId, user);
```

#### **Parameters**

* userId `<string>`: the id of an userdocks user (uuid)
* user `<object>`: an object holding two keys
  * email `<string>`
  * language `<string>`: a two character country code

#### **Return value**

```js
// POST /v1/users/:userId/referral-invites
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null
}
```

## **Usage**

Import the library and call the methods.

```js
import userdocks from '@userdocks/javascript-rest-api';

// method to receive the token
const token = await getToken();

// initialize the userdocks api whenever api keys or the access token changes
await userdocks.initialize({
  Authentication: `Bearer ${token}`, // or use the api keys if you make requests from a server
  // 'X-API-KEY': process.env.USERDOCKS_API_KEY,
  // 'X-API-KEY-TYPE': process.env.USERDOCKS_API_KEY_TYPE,
  // 'X-CLIENT-ID': process.env.USERDOCKS_APP_ID,
}, {
  url: 'https://api.userdocks.com', // use your own api url e.g. when used with CNAME in userdocks
  version: 'v1', // the api version, currently v1 is the only version
  test: true, // indicate if used in test mode for payment
});

// use the api to e.g. get a user
const user = await userdocks.users.retrieve('me');
```

## **Usage for Development**

Start the watcher and link the package locally:

```bash
npm run watch
npm run link
```

Link the package in the project where it will be used:

```bash
# if you run "npm i" in your project you need to re-run this command
npm link @userdocks/javascript-rest-api
```

To use this module with typescript and with npm link add the follwing to your tsconfig.json:

```json
{
  "compilerOptions": {
    "paths": {
      "@userdocks/javascript-rest-api": [
        "./node_modules/@userdocks/javascript-rest-api"
      ]
    }
  }
}
```
