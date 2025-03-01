import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";

function Loader({ text }: { readonly text: string }) {
	return (
		<div className="flex items-center space-x-2">
			<IconLoader className="mr-2 h-4 w-4 animate-spin" />
			<p>{text}</p>
		</div>
	);
}

interface LoadingButtonProps {
	children: React.ReactNode;
	loadingText?: string;
	className?: string;
	variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
	loading?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

export function LoadingButton({
	children,
	loadingText = "Loading",
	loading,
	className,
	onClick = () => {},
	variant,
	disabled,
	...props
}: Readonly<LoadingButtonProps>) {
	return (
		<Button
			type="submit"
			aria-disabled={loading}
			disabled={loading || disabled}
			className={cn(className)}
			onClick={onClick}
			variant={variant}
			{...props}
		>
			{loading ? <Loader text={loadingText} /> : children}
		</Button>
	);
}
