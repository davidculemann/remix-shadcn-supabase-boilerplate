import LogoImage from "/assets/logo2.svg";

export default function Logo({ className = "h-10" }: { readonly className?: string }) {
	return <img src={LogoImage} alt="logo" className={className} />;
}
