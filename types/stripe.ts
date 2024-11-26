import type { Database } from "db_types";
import type { CURRENCIES } from "@/services/stripe/plans";

// Get the Subscription type from your database types
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

// Get the Currency type from your constants
export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];
