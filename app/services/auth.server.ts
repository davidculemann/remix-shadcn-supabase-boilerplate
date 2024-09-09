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
