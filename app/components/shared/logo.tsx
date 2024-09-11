import logoImage from "/public/images/logo.svg";

export default function Logo({ className }: { readonly className?: string }) {
	return <img src={logoImage} alt="logo" className={className} />;
}
