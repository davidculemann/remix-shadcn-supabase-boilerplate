export const APP_NAME = "remix-shadcn";

export function title(pageTitle?: string) {
	if (!pageTitle) return APP_NAME;

	return `${pageTitle} | ${APP_NAME}`;
}

export const PROTECTED_ROUTES = ["/dashboard"];
export const NO_AUTH_ROUTES = ["/signin", "/signup"];
