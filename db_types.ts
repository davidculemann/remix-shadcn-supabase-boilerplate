export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			emails: {
				Row: {
					created_at: string;
					email: string | null;
					id: number;
				};
				Insert: {
					created_at?: string;
					email?: string | null;
					id?: number;
				};
				Update: {
					created_at?: string;
					email?: string | null;
					id?: number;
				};
				Relationships: [];
			};
			"keep-alive": {
				Row: {
					id: number;
					name: string | null;
					random: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
					random?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
					random?: string | null;
				};
				Relationships: [];
			};
			plans: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: string;
					name: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			prices: {
				Row: {
					amount: number;
					created_at: string | null;
					currency: string;
					id: string;
					interval: string;
					plan_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					amount: number;
					created_at?: string | null;
					currency: string;
					id?: string;
					interval: string;
					plan_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					amount?: number;
					created_at?: string | null;
					currency?: string;
					id?: string;
					interval?: string;
					plan_id?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "prices_plan_id_fkey";
						columns: ["plan_id"];
						isOneToOne: false;
						referencedRelation: "plans";
						referencedColumns: ["id"];
					},
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string | null;
					customer_id: string | null;
					email: string | null;
					id: string;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string | null;
					customer_id?: string | null;
					email?: string | null;
					id: string;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string | null;
					customer_id?: string | null;
					email?: string | null;
					id?: string;
					username?: string | null;
				};
				Relationships: [];
			};
			subscriptions: {
				Row: {
					cancel_at_period_end: boolean | null;
					created_at: string | null;
					current_period_end: string | null;
					current_period_start: string | null;
					id: string;
					interval: string;
					plan_id: string | null;
					price_id: string | null;
					status: string;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					cancel_at_period_end?: boolean | null;
					created_at?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					id?: string;
					interval: string;
					plan_id?: string | null;
					price_id?: string | null;
					status: string;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					cancel_at_period_end?: boolean | null;
					created_at?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					id?: string;
					interval?: string;
					plan_id?: string | null;
					price_id?: string | null;
					status?: string;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "subscriptions_plan_id_fkey";
						columns: ["plan_id"];
						isOneToOne: false;
						referencedRelation: "plans";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "subscriptions_price_id_fkey";
						columns: ["price_id"];
						isOneToOne: false;
						referencedRelation: "prices";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
