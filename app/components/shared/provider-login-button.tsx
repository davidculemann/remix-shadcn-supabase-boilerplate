import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { useOutletContext } from "@remix-run/react";
import type { Provider } from "@supabase/supabase-js";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";

//type the below so that the key is always a prodiver type it should
const providerLogos: Partial<Record<Provider, string>> = {
	google: "https://www.svgrepo.com/show/475656/google-color.svg",
	github: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg",
};

const providerDisplayName: Partial<Record<Provider, string>> = {
	google: "Google",
	github: "GitHub",
};

export default function ProviderLoginButton({
	provider,
}: {
	provider: Provider;
}) {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	const { toast } = useToast();

	const handleSignIn = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/dashboard`,
			},
		});

		if (error) {
			toast({
				variant: "destructive",
				description: `Error occured: ${error}`,
			});
		}
	};

	const providerLogo = providerLogos[provider];
	return (
		<Button className="w-full" variant="outline" onClick={handleSignIn} type="button">
			<span className="flex gap-2">
				<img src={providerLogo} alt="Google Logo" width={18} height={18} />
				{providerDisplayName[provider]}
			</span>
		</Button>
	);
}
