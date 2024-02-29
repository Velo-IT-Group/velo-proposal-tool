export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			integrations: {
				Row: {
					auth_type: Database['public']['Enums']['auth_type'] | null;
					id: string;
					name: string;
					logo: string | null;
				};
				Insert: {
					auth_type?: Database['public']['Enums']['auth_type'] | null;
					id?: string;
					name: string;
					logo?: string | null;
				};
				Update: {
					auth_type?: Database['public']['Enums']['auth_type'] | null;
					id?: string;
					name?: string;
					logo?: string | null;
				};
				Relationships: [];
			};
			organization_integrations: {
				Row: {
					client_id: string | null;
					integration: string;
					organization: string;
					type: Database['public']['Enums']['integration_type'] | null;
				};
				Insert: {
					client_id?: string | null;
					integration: string;
					organization: string;
					type?: Database['public']['Enums']['integration_type'] | null;
				};
				Update: {
					client_id?: string | null;
					integration?: string;
					organization?: string;
					type?: Database['public']['Enums']['integration_type'] | null;
				};
				Relationships: [
					{
						foreignKeyName: 'public_organization_integrations_integration_fkey';
						columns: ['integration'];
						isOneToOne: false;
						referencedRelation: 'integrations';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_organization_integrations_organization_fkey';
						columns: ['organization'];
						isOneToOne: false;
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			organizations: {
				Row: {
					default_template: number | null;
					id: string;
					labor_rate: number;
					name: string;
					slug: string | null;
				};
				Insert: {
					default_template?: number | null;
					id?: string;
					labor_rate: number;
					name: string;
					slug?: string | null;
				};
				Update: {
					default_template?: number | null;
					id?: string;
					labor_rate?: number;
					name?: string;
					slug?: string | null;
				};
				Relationships: [];
			};
			phases: {
				Row: {
					description: string;
					hours: number;
					id: string;
					order: number;
					proposal: string | null;
				};
				Insert: {
					description: string;
					hours?: number;
					id?: string;
					order?: number;
					proposal?: string | null;
				};
				Update: {
					description?: string;
					hours?: number;
					id?: string;
					order?: number;
					proposal?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'public_phases_proposal_fkey';
						columns: ['proposal'];
						isOneToOne: false;
						referencedRelation: 'proposals';
						referencedColumns: ['id'];
					}
				];
			};
			products: {
				Row: {
					catalog_item_id: number | null;
					cost: number | null;
					extended_price: number;
					id: string;
					is_phase_item: boolean | null;
					is_recurring: boolean | null;
					is_taxable: boolean | null;
					manufacturing_part_number: string | null;
					name: string;
					notes: string | null;
					price: number | null;
					proposal: string;
					quantity: number;
					suggested_price: number | null;
					vendor_name: string | null;
					vendor_part_number: string | null;
				};
				Insert: {
					catalog_item_id?: number | null;
					cost?: number | null;
					extended_price: number;
					id?: string;
					is_phase_item?: boolean | null;
					is_recurring?: boolean | null;
					is_taxable?: boolean | null;
					manufacturing_part_number?: string | null;
					name?: string;
					notes?: string | null;
					price?: number | null;
					proposal: string;
					quantity?: number;
					suggested_price?: number | null;
					vendor_name?: string | null;
					vendor_part_number?: string | null;
				};
				Update: {
					catalog_item_id?: number | null;
					cost?: number | null;
					extended_price?: number;
					id?: string;
					is_phase_item?: boolean | null;
					is_recurring?: boolean | null;
					is_taxable?: boolean | null;
					manufacturing_part_number?: string | null;
					name?: string;
					notes?: string | null;
					price?: number | null;
					proposal?: string;
					quantity?: number;
					suggested_price?: number | null;
					vendor_name?: string | null;
					vendor_part_number?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'public_products_proposal_fkey';
						columns: ['proposal'];
						isOneToOne: false;
						referencedRelation: 'proposals';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					full_name: string | null;
					id: string;
					organization: string | null;
					updated_at: string | null;
					username: string | null;
					website: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					full_name?: string | null;
					id: string;
					organization?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					full_name?: string | null;
					id?: string;
					organization?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'profiles_organization_fkey';
						columns: ['organization'];
						isOneToOne: false;
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			proposals: {
				Row: {
					company_name: string | null;
					created_at: string;
					hours_required: number | null;
					id: string;
					labor_hours: number;
					labor_rate: number;
					management_hours: number;
					name: string;
					organization: string | null;
					sales_hours: number;
					service_ticket: number | null;
					templates_used: number[] | null;
					total_labor_price: number;
					total_price: number | null;
					total_product_price: number;
					updated_at: string;
				};
				Insert: {
					company_name?: string | null;
					created_at?: string;
					hours_required?: number | null;
					id?: string;
					labor_hours?: number;
					labor_rate?: number;
					management_hours?: number;
					name: string;
					organization?: string | null;
					sales_hours?: number;
					service_ticket?: number | null;
					templates_used?: number[] | null;
					total_labor_price?: number;
					total_price?: number | null;
					total_product_price?: number;
					updated_at?: string;
				};
				Update: {
					company_name?: string | null;
					created_at?: string;
					hours_required?: number | null;
					id?: string;
					labor_hours?: number;
					labor_rate?: number;
					management_hours?: number;
					name?: string;
					organization?: string | null;
					sales_hours?: number;
					service_ticket?: number | null;
					templates_used?: number[] | null;
					total_labor_price?: number;
					total_price?: number | null;
					total_product_price?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'proposals_organization_fkey';
						columns: ['organization'];
						isOneToOne: false;
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			tasks: {
				Row: {
					created_at: string;
					id: string;
					notes: string;
					priority: number;
					summary: string;
					ticket: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					notes: string;
					priority: number;
					summary: string;
					ticket: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					notes?: string;
					priority?: number;
					summary?: string;
					ticket?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'tasks_ticket_fkey';
						columns: ['ticket'];
						isOneToOne: false;
						referencedRelation: 'tickets';
						referencedColumns: ['id'];
					}
				];
			};
			tickets: {
				Row: {
					budget_hours: number;
					created_at: string;
					id: string;
					order: number;
					phase: string;
					summary: string;
				};
				Insert: {
					budget_hours?: number;
					created_at?: string;
					id?: string;
					order?: number;
					phase: string;
					summary: string;
				};
				Update: {
					budget_hours?: number;
					created_at?: string;
					id?: string;
					order?: number;
					phase?: string;
					summary?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_tickets_phase_fkey';
						columns: ['phase'];
						isOneToOne: false;
						referencedRelation: 'phases';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			is_organization_member: {
				Args: {
					organization_id: string;
					user_id: string;
				};
				Returns: boolean;
			};
			slugify: {
				Args: {
					value: string;
				};
				Returns: string;
			};
			unaccent: {
				Args: {
					'': string;
				};
				Returns: string;
			};
			unaccent_init: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
		};
		Enums: {
			auth_type: 'OAuth2';
			integration_type: 'reseller';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Tables<
	PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views']) | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
	? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never;
