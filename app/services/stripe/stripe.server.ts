import Stripe from "stripe";
import { CURRENCIES } from "./plans";

export type Locales = string[] | undefined;
/**
 * Get the client's locales from the Accept-Language header.
 * If the header is not defined returns null.
 * If the header is defined return an array of locales, sorted by the quality
 * value.
 *
 * @example
 * export async function loader({ request }: LoaderArgs) {
 *   let locales = getClientLocales(request)
 *   let date = new Date().toLocaleDateString(locales, {
 *     "day": "numeric",
 *   });
 *   return json({ date })
 * }
 */
declare function getClientLocales(headers: Headers): Locales;
declare function getClientLocales(request: Request): Locales;

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("Stripe - Environment variables not initialized.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2024-09-30.acacia",
	typescript: true,
});

export function getLocaleCurrency(request: Request) {
	const locales = getClientLocales(request);
	if (!locales) return CURRENCIES.DEFAULT;

	return locales.find((locale) => locale === "en-US") ? CURRENCIES.USD : CURRENCIES.EUR;
}
