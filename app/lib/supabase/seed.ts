import { type Interval, PLANS, PRICING_PLANS } from "@/services/stripe/plans";
import { stripe } from "@/services/stripe/stripe.server";
import { getSupabaseWithHeaders } from "./supabase.server";

// async function seedProfiles(supabase: any) {
// 	const { data: existingProfiles } = await supabase.from("profiles").select("*");
// 	if (existingProfiles?.length) {
// 		console.info("🏃‍♂️ Skipping profiles seeding - profiles already exist");
// 		return;
// 	}

// 	// First create the user in auth.users
// 	const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
// 		email: "test@example.com",
// 		password: "password123",
// 		email_confirm: true,
// 	});

// 	if (authError) {
// 		console.error("Error creating auth user:", authError);
// 		throw authError;
// 	}

// 	// Then create the profile using the auth user's ID
// 	const { error } = await supabase.from("profiles").insert([
// 		{
// 			id: authUser.user.id,
// 			email: "test@example.com",
// 			username: "Test User",
// 			avatar_url: null,
// 			customer_id: null,
// 			created_at: new Date().toISOString(),
// 		},
// 	]);

// 	if (error) {
// 		console.error("Error seeding profiles:", error);
// 		throw error;
// 	}
// }

async function seedKeepAlive(supabase: any) {
	const { data: existingKeepAlive } = await supabase.from("keep_alive").select("*");
	if (existingKeepAlive?.length) {
		console.info("🏃‍♂️ Skipping keep_alive seeding - entries already exist");
		return;
	}

	const { error } = await supabase.from("keep_alive").insert([{ name: "placeholder" }, { name: "example" }]);

	if (error) {
		console.error("Error seeding keep_alive:", error);
		throw error;
	}
}

async function seed() {
	const { supabase } = getSupabaseWithHeaders({ request: new Request("http://localhost:3000") });

	/**
	 * Check if products already exist in Stripe
	 */
	const products = await stripe.products.list();
	const { data: supabasePlans } = await supabase.from("plans").select("*");
	const { data: supabasePrices } = await supabase.from("prices").select("*");

	const hasStripeProducts = products?.data?.length;
	const hasSupabasePlans = supabasePlans?.length;
	const hasSupabasePrices = supabasePrices?.length;
	const needsSeeding = !hasStripeProducts || !hasSupabasePlans || !hasSupabasePrices;

	if (!needsSeeding) {
		console.info("🏃‍♂️ Skipping seeding - products already exist");
		return;
	}

	const seedProducts = Object.values(PRICING_PLANS).map(async ({ id, name, description, prices }) => {
		// Format prices to match Stripe's API
		const pricesByInterval = Object.entries(prices).flatMap(([interval, price]) => {
			return Object.entries(price).map(([currency, amount]) => ({
				interval,
				currency,
				amount,
			}));
		});

		if (!hasStripeProducts) {
			// Create Stripe product
			await stripe.products.create({
				id,
				name,
				description: description || undefined,
			});
		}

		// Create Stripe prices for the product
		const stripePrices = await Promise.all(
			pricesByInterval.map((price) => {
				return stripe.prices.create({
					product: id,
					currency: price.currency.toLowerCase(),
					unit_amount: price.amount,
					tax_behavior: "inclusive",
					recurring: {
						interval: price.interval.toLowerCase() as Interval,
					},
				});
			}),
		);

		// Store plan in Supabase
		const { error: planError } = await supabase.from("plans").upsert({
			id,
			name,
			description,
		});

		if (planError) {
			console.error("Error creating plan:", planError);
			throw planError;
		}

		// Store prices in Supabase
		const { error: pricesError } = await supabase.from("prices").upsert(
			stripePrices.map((price) => ({
				id: price.id,
				plan_id: id,
				amount: price.unit_amount || 0,
				currency: price.currency,
				interval: price.recurring?.interval || "month",
			})),
		);

		if (pricesError) {
			console.error("Error creating prices:", pricesError);
			throw pricesError;
		}

		return {
			product: id,
			prices: stripePrices.map((price) => price.id),
		};
	});

	// Create all products and prices
	const seededProducts = await Promise.all(seedProducts);
	console.info("📦 Stripe Products and Prices created successfully");

	// Configure Customer Portal
	await stripe.billingPortal.configurations.create({
		business_profile: {
			headline: "Customer Portal",
		},
		features: {
			customer_update: {
				enabled: true,
				allowed_updates: ["email"],
			},
			invoice_history: { enabled: true },
			payment_method_update: { enabled: true },
			subscription_cancel: { enabled: true },
			subscription_update: {
				enabled: true,
				default_allowed_updates: ["price"],
				proration_behavior: "always_invoice",
				products: seededProducts.filter(({ product }) => product !== PLANS.FREE),
			},
		},
	});

	console.info("👒 Stripe Customer Portal configured successfully");
	console.info("🎉 Visit: https://dashboard.stripe.com/test/products to see your products");

	// await seedProfiles(supabase);
	// console.info("👤 Profiles seeded successfully");

	await seedKeepAlive(supabase);
	console.info("⚡ Keep-alive table seeded successfully");
}

seed()
	.catch((err) => {
		console.error("Seed error:", err);
		process.exit(1);
	})
	.finally(() => {
		console.info("✅ Seed completed");
	});
