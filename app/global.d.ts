import type { Database as DB, Tables } from '@/types/supabase';
import { Tables } from '@/types/supabase';

declare global {
	type Database = DB;
	type Integration = DB['public']['Tables']['integrations']['Row'];
	type Organization = DB['public']['Tables']['organizations']['Row'];
	type OrganizationUpdate = DB['public']['Tables']['organizations']['Update'];
	type OrganizationInsert = DB['public']['Tables']['organizations']['Insert'];
	type OrganizationIntegrationInsert = DB['public']['Tables']['organization_integrations']['Insert'];
	type OrganizationIntegrationUpdate = DB['public']['Tables']['organization_integrations']['Update'];
	type OrganizationIntegration = DB['public']['Tables']['organization_integrations']['Row'];
	type Member = DB['public']['Tables']['profiles']['Row'];
	type Phase = DB['public']['Tables']['phases']['Row'];
	type PhaseInsert = DB['public']['Tables']['phases']['Insert'];
	type PhaseUpdate = DB['public']['Tables']['phases']['Update'];
	type Product = DB['public']['Tables']['products']['Row'];
	type NestedProduct = Product & { products: Product[] };
	type ProductInsert = DB['public']['Tables']['products']['Insert'];
	type ProductUpdate = DB['public']['Tables']['products']['Update'];
	type Profile = DB['public']['Tables']['profiles']['Row'];
	type Proposal = DB['public']['Tables']['proposals']['Row'];
	type ProposalUpdate = DB['public']['Tables']['proposals']['Update'];
	type ProposalInsert = DB['public']['Tables']['proposals']['Insert'];
	type Task = DB['public']['Tables']['tasks']['Row'];
	type TaskInsert = DB['public']['Tables']['tasks']['Insert'];
	type TaskUpdate = DB['public']['Tables']['tasks']['Update'];
	type Ticket = DB['public']['Tables']['tickets']['Row'];
	type TicketInset = DB['public']['Tables']['tickets']['Insert'];
	type TicketUpdate = DB['public']['Tables']['tickets']['Insert'];
	type DoublyNestedProposal = Proposal & { phases?: Array<NestedProposal> };
	type NestedProposal = Proposal & { phases?: Array<Phase> };
	type NestedPhase = Phase & { tickets?: Array<Ticket & { tasks?: Task[] }> };
	type NestedTicket = Ticket & { tasks?: Task[] };
}
