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

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build` and the server

-   `server.js`
-   `build/server`
-   `build/client`

Take a look at the provided Dockerfile for further details on how to configure a production environment.
