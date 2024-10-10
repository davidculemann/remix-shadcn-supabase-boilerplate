import { default as DocsPage, loader, meta } from "@/routes/docs.$lang.$ref.$";

function SplatPage() {
	return <DocsPage />;
}

export default SplatPage;
export { loader, meta };
