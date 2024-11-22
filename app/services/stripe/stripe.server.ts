import Stripe from "stripe";
import { CURRENCIES } from "./plans";

export type Locales = string[] | undefined;

/**
 * Get the client's locales from the Accept-Language header.
 * If the header is not defined returns null.
 * If the header is defined return an array of locales, sorted by the quality
 * value.
 */
function getClientLocales(input: Headers | Request): Locales {
	let acceptLanguage: string | null;

	if (input instanceof Request) {
		acceptLanguage = input.headers.get("accept-language");
	} else {
		acceptLanguage = input.get("accept-language");
	}

	if (!acceptLanguage) return undefined;

	// Parse the Accept-Language header
	return acceptLanguage
		.split(",")
		.map((lang) => {
			const [locale, quality = "1"] = lang.trim().split(";q=");
			return {
				locale: locale.trim(),
				quality: parseFloat(quality),
			};
		})
		.sort((a, b) => b.quality - a.quality)
		.map((item) => item.locale);
}

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
