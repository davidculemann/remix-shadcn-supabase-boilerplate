# Boilerplate for Remix + Vite + shadcn/ui + Supabase

## Demo

Live app: [remix-shadcn-boilerplate.vercel.app](https://remix-shadcn-boilerplate.vercel.app)

## What's inside?

- A fullstack app with [Remix](https://remix.run), [Vite](https://vitejs.dev), [shadcn/ui](https://shadcn/ui), and [Supabase](https://supabase.io)
- Complete authentication flow with Supabase
  - Signup with email, Google, Github
  - Login with email, Google, Github
  - Forgot password flow
  - Logout
- Protected routes
- A beautiful and professional dashboard layout, credit to [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
- A documentation page, configurable to point to your own markdown files in a GitHub repo.
- A customisable pricing page with Stripe integration.
- Easily configurable for your own project

## Setup

- Clone the repo:

```sh
git clone git@github.com:davidculemann/remix-shadcn-boilerplate.git
```

- Install dependencies:

```sh
pnpm install
```

### Supabase

- Create a new project on [Supabase](https://supabase.io)

- enter your Supabase URL and key in `.env`:

```sh
VITE_SUPABASE_URL=https://<your_supabase_url>.supabase.co
VITE_SUPABASE_KEY=<your_supabase_key>
```

- generate typescript types for your Supabase tables:

```sh
supabase gen types typescript --project-id opcoizjyzpdodlwaoppd > db_types.ts
```

### Email

- Supabase aggressively rate limits your email sending on the free plan, so you'll need to use a third-party email service. I recommend [Resend](https://resend.com) for this. Add the supabase integration here: https://resend.com/settings/integrations.

## Development

1. Seed the database:

```sh
pnpm run seed
```

2. Run the Vite dev server:

```sh
npm run dev
```

## Stripe

In order to use Stripe Subscriptions and seed the database, you'll need to create a [Stripe Account](https://dashboard.stripe.com/login) and get the secret key from the Stripe Dashboard.

1. Create a [Stripe Account](https://dashboard.stripe.com/login) or use an existing one.
2. Visit [API Keys](https://dashboard.stripe.com/test/apikeys) section and copy the `Secret` key.
3. Paste your secret key into `.env` file as `STRIPE_SECRET_KEY`.

## Stripe Webhook

1. In order to start receiving Stripe Events to our Webhook Endpoint, you need to install the [Stripe CLI.](https://stripe.com/docs/stripe-cli) Once installed run the following command in your console. _(Make sure you're in the root of your project)_:

```sh
stripe listen --forward-to localhost:3000/api/webhook
```

This should give you a Webhook Secret Key. Copy and paste it into your `.env` file as `STRIPE_WEBHOOK_ENDPOINT`.

> [!IMPORTANT]
> This command should be running in your console while developing, especially when testing or handling Stripe Events.

2. Then, you should run the seed command to populate your stripe store with products and prices:

```sh
pnpm run seed
```

## Deployment

### With Vercel

1. First, install the Vercel CLI:

```sh
npm install -g vercel
```

2. Then deploy your app:

```sh
vercel
```

### Manual Deployment

1. First, build your app for production:

```sh
npm run build
```

2. Setup your environment:

```sh
NODE_ENV='production'
```

3. Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## Stack

- [Remix](https://remix.run)
- [Vite](https://vitejs.dev)
- [shadcn/ui](https://shadcn/ui)
- [Supabase](https://supabase.io)
- [React Query](https://react-query.tanstack.com)
- [Framer Motion](https://www.framer.com/motion)
- [Resend](https://resend.io)
- [zustand](https://zustand.surge.sh)
- [Logoipsum](https://logoipsum.com)
- [Stripe](https://stripe.com)

## Tooling

- [Biome](https://biomejs.dev)
- [pnpm](https://pnpm.io)
- [Vite](https://vitejs.dev)
- [Vercel](https://vercel.com)

## Credits

- [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar): Professional yet beautiful dashboard layout built with shadcn, adapted from Next-js.
- [remix-docs-template](https://github.com/boomerang-io/remix-docs-template): A powerful and customisable template for Remix documentation sites.
- [pricing-page-shadcn](https://github.com/m4nute/pricing-page-shadcn): A pricing page built with shadcn, adapted from Next-js.
- [shadcn-admin](https://github.com/satnaing/shadcn-admin): Very useful layouts for settings screens.
- [remix-saas](https://remix-saas.fly.dev/): The best Remix starter I've seen so far, took some inspiration from the landing page and stripe implementation, adapated from Prisma to Supabase.
