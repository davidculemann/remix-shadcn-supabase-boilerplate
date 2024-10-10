import { PrefetchPageLinks, useNavigate } from "@remix-run/react";
import * as React from "react";

function isLinkEvent(event: MouseEvent) {
	if (!(event.target instanceof HTMLElement)) return;
	const a = event.target.closest("a");
	return (
		a && // is anchor or has anchor parent
		!a.hasAttribute("data-noprefetch") && // didn't opt out
		a.hasAttribute("href") && // has an href
		a.host === window.location.host && // is internal
		a
	);
}

function useDelegatedReactRouterLinks(nodeRef: React.RefObject<HTMLElement>) {
	const navigate = useNavigate();

	React.useEffect(() => {
		const node = nodeRef.current;
		function handleClick(event: MouseEvent) {
			if (!node) return;
			const a = isLinkEvent(event);
			if (
				a &&
				event.button === 0 && // left click
				(!a.target || a.target === "_self") && // Let browser handle "target=_blank" etc.
				!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) // not modified
			) {
				event.preventDefault();
				const { pathname, search, hash } = a;
				navigate({ pathname, search, hash });
			}
		}
		node?.addEventListener("click", handleClick);
		return () => {
			node?.removeEventListener("click", handleClick);
		};
	}, [navigate, nodeRef]);
}

function PrefetchMarkdownLinks({ children }: { children: React.ReactNode }) {
	const nodeRef = React.useRef<HTMLDivElement>(null);
	const [page, setPage] = React.useState<null | string>(null);

	React.useEffect(() => {
		const node = nodeRef.current;
		function handleMouseEnter(event: MouseEvent) {
			if (!nodeRef.current) return;
			const a = isLinkEvent(event);
			if (a) {
				const { pathname, search } = a;
				setPage(pathname + search);
			}
		}
		node?.addEventListener("mouseenter", handleMouseEnter, true);
		return () => {
			node?.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, []);

	return (
		<div ref={nodeRef}>
			{children}
			{page && <PrefetchPageLinks page={page} />}
		</div>
	);
}

export { PrefetchMarkdownLinks, useDelegatedReactRouterLinks };
