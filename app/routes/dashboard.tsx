import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";

export const loader = async () => {
	const supabase = createClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!
	);
	const { data } = await supabase.from("test").select();
	return {
		data,
	};
};

export default function Dashboard() {
	const data = useLoaderData();

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
