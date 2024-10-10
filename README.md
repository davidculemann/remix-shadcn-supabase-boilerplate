# Boilerplate for Remix + Vite + shadcn/ui + Supabase

## What's inside?

-   A fullstack app with [Remix](https://remix.run), [Vite](https://vitejs.dev), [shadcn/ui](https://shadcn/ui), and [Supabase](https://supabase.io)
-   Complete authentication flow with Supabase
    -   Signup with email, Google, Github
    -   Login with email, Google, Github
    -   Forgot password flow
    -   Logout
-   Protected routes
-   A beautiful and professional dashboard layout, credit to [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
-   Easily configurable for your own project

## Setup

-   Clone the repo:

```sh
git clone git@github.com:davidculemann/remix-shadcn-boilerplate.git
```

-   Install dependencies:

```sh
pnpm install
```

### Supabase

-   Create a new project on [Supabase](https://supabase.io)

-   enter your Supabase URL and key in `.env`:

```sh
VITE_SUPABASE_URL=https://<your_supabase_url>.supabase.co
VITE_SUPABASE_KEY=<your_supabase_key>
```

-   generate typescript types for your Supabase tables:

```sh
supabase gen types typescript --project-id opcoizjyzpdodlwaoppd > db_types.ts
```

### Email

-   Supabase aggressively rate limits your email sending on the free plan, so you'll need to use a third-party email service. I recommend [Resend](https://resend.com) for this. Add the supabase integration here: https://resend.com/settings/integrations.

## Development

Run the Vite dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Setup your environment:

```sh
NODE_ENV='production'
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## Stack

-   [Remix](https://remix.run)
-   [Vite](https://vitejs.dev)
-   [shadcn/ui](https://shadcn/ui)
-   [Supabase](https://supabase.io)
-   [React Query](https://react-query.tanstack.com)
-   [Framer Motion](https://www.framer.com/motion)
-   [Resend](https://resend.io)
-   [zustand](https://zustand.surge.sh)
-   [Logoipsum](https://logoipsum.com)

## Credits

-   [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar): Professional yet beautiful dashboard layout built with shadcn, adapted from Next.js to Remix
-   [remix-docs-template](https://github.com/boomerang-io/remix-docs-template): A powerful template for Remix documentation sites

## Tooling

-   [Biome](https://biomejs.dev)
-   [pnpm](https://pnpm.io)
-   [Vite](https://vitejs.dev)
