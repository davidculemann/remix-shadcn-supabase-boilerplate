import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useRevalidator } from "@remix-run/react";
import { Loader2, BadgeCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  getSupabaseWithHeaders,
  requireUser,
} from "@/lib/supabase/supabase.server";
import { PLANS } from "@/services/stripe/plans";
import { useInterval } from "@/hooks/use-interval";

export const ROUTE_PATH = "/dashboard/checkout";

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.name} - Checkout` }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase, headers } = getSupabaseWithHeaders({ request });

  const sessionUser = await requireUser({ supabase, headers });

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", sessionUser.id)
    .single();

  if (error || !subscription) return redirect("/dashboard");

  return json({ isFreePlan: subscription.plan_id === PLANS.FREE } as const);
}

export default function DashboardCheckout() {
  const { isFreePlan } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();

  const [retries, setRetries] = useState(0);

  useInterval(
    () => {
      revalidate();
      setRetries(retries + 1);
    },
    isFreePlan && retries !== 3 ? 2_000 : null
  );

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-primary">
                Completing your Checkout
              </h2>
              <p className="text-sm font-normal text-primary/60">
                We are completing your checkout, please wait ...
              </p>
            </div>
          </div>
          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>
          <div className="relative mx-auto flex w-full flex-col items-center p-6">
            <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border border-border bg-secondary px-6 py-24 dark:bg-card">
              <div className="z-10 flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-card hover:border-primary/40">
                  {isFreePlan && retries < 3 && (
                    <Loader2 className="h-8 w-8 animate-spin stroke-[1.5px] text-primary/60" />
                  )}
                  {!isFreePlan && (
                    <BadgeCheck className="h-8 w-8 stroke-[1.5px] text-primary/60" />
                  )}
                  {isFreePlan && retries === 3 && (
                    <AlertTriangle className="h-8 w-8 stroke-[1.5px] text-primary/60" />
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center text-base font-medium text-primary">
                    {isFreePlan &&
                      retries < 3 &&
                      "Completing your checkout ..."}
                    {!isFreePlan && "Checkout completed!"}
                    {isFreePlan &&
                      retries === 3 &&
                      "Something went wrong, but don't worry, you will not be charged."}
                  </p>
                </div>
              </div>
              <div className="z-10 flex items-center justify-center">
                <Link
                  to={"dashboard"}
                  prefetch="intent"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })} gap-2`}
                >
                  <span className="text-sm font-medium text-primary/60 group-hover:text-primary">
                    Return to Dashboard
                  </span>
                  <ExternalLink className="h-4 w-4 stroke-[1.5px] text-primary/60 group-hover:text-primary" />
                </Link>
              </div>
              <div className="base-grid absolute h-full w-full opacity-40" />
              <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
