import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
export async function loader({ params }: LoaderFunctionArgs) {
	const { lang } = params;
	return redirect(`/docs/${lang}/main`);
}
