import type { Provider } from "@/lib/types";
import googleLogo from "/public/images/google.svg";
import { Button } from "../ui/button";

//type the below so that the key is always a prodiver type it should
const providerLogos: Partial<Record<Provider, string>> = {
	google: googleLogo,
};

export default function ProviderLoginButton({
	provider,
	signInFn,
}: {
	provider: Provider;
	signInFn: () => void;
}) {
	const providerLogo = providerLogos[provider];
	return (
		<Button className="w-full" variant="outline" onClick={signInFn}>
			<span className="flex gap-2">
				<img src={providerLogo} alt="Google Logo" width={18} height={18} />
				Sign in with {provider}
			</span>
		</Button>
	);
}
