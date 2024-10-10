import { docConfig } from "@/config/doc";
import { getRepoImage } from "@/utils/github";
import { handleRedirects } from "@/utils/http.server";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";

export async function loader({ params, request }: LoaderFunctionArgs) {
	invariant(params.ref, "expected `ref` params");
	try {
		const pathPrefix = docConfig.pathToDocs ? `${docConfig.pathToDocs}/` : "";
		const slug = `${pathPrefix}${params["*"]}`;
		const image = await getRepoImage(params.ref, slug);
		if (!image) throw null;
		return new Response(image, {
			headers: {
				"Content-Type": "image/png",
				// starting with 1 day, may need to be longer as these images don't change often
				// could also make it dependent on the date of the post
				"Cache-Control": `max-age=${60 * 60 * 24}`,
			},
		});
	} catch (_) {
		if (params.ref === "main" && params["*"]) {
			// Only perform redirects for 404's on `main` URLs which are likely being
			// redirected from the root `/docs/{slug}`.  If someone is direct linking
			// to a missing slug on an old version or tag, then a 404 feels appropriate.
			handleRedirects(`/docs/${params["*"]}`);
		}
		throw json(null, { status: 404 });
	}
}
