import { redirect } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "../services/session.server";

type User = {
	id: string;
	username: string;
	email: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

/**
 * Utilities.
 */
export async function requireSessionUser(request: Request, { redirectTo }: { redirectTo?: string | null } = {}) {
	const sessionUser = await authenticator.isAuthenticated(request);
	if (!sessionUser) {
		if (!redirectTo) throw redirect("signout");
		throw redirect(redirectTo);
	}
	return sessionUser;
}
