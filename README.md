# Boilerplate for Remix + Vite + shadcn/ui + Supabase!

## Supabase

-   enter your Supabase URL and key in `.env`:

```sh
VITE_SUPABASE_URL=https://<your_supabase_url>.supabase.co
VITE_SUPABASE_KEY=<your_supabase_key>
```

-   generate typescript types for your Supabase tables:

```sh
supabase gen types typescript --project-id opcoizjyzpdodlwaoppd > db_types.ts
```

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

## Credits

-   [Remix](https://remix.run)
-   [Vite](https://vitejs.dev)
-   [shadcn/ui](https://shadcn/ui)
-   [Supabase](https://supabase.io)
-   [Resend](https://resend.io)
-   [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
-   [Biome](https://biomejs.dev)
-   [zustand](https://zustand.surge.sh)
