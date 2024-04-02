'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import axios, { AxiosResponse } from 'axios';
import { baseConfig } from '../utils';
import { ProductsItem } from '@/types/manage';

/**
 * Updates Product In Supabase.
 * @param {string} id - The id of the product.
 * @param {ProductUpdate} product - The product you're wanting to update.
 */
export const updateProduct = async (id: string, product: ProductUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('products').update(product).eq('unique_id', id);

	console.log(id, product, error);
	console.log('running func');

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('proposals');
	revalidateTag('products');
};

/**
 * Updates Proposal In Supabase.
 * @param {string} id - The id of the proposal you're wanting to update.
 * @param {ProposalUpdate} proposal - The proposal you're wanting to update.
 */
export const updateProposal = async (id: string, proposal: ProposalUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('proposals').update(proposal).eq('id', id);

	if (error) {
		console.error(error);
		throw Error(error.message);
	}

	revalidateTag('proposals');
};

/**
 * Updates Ticket In Supabase.
 * @param {string} id - The id of the ticket you're wanting to update.
 * @param {TicketUpdate} ticket - The ticket you're wanting to update.
 */
export const updateTicket = async (id: string, ticket: TicketUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('tickets').update(ticket).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('proposals');
};

/**
 * Updates Phase In Supabase.
 * @param {string} id - The id of the phase you're wanting to update.
 * @param {PhaseUpdate} phase - The phase you're wanting to update.
 */
export const updatePhase = async (id: string, phase: PhaseUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('phases').update(phase).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('proposals');
};

/**
 * Updates Phase In Supabase.
 * @param {string} id - The id of the comment you're wanting to update.
 * @param {PhaseUpdate} comment - The comment you're wanting to update.
 */
export const updateComment = async (id: string, comment: CommentUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('comments').update(comment).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('proposals');
};

/**
 * Updates Task In Supabase.
 * @param {string} id - The id of the task you're wanting to update.
 * @param {TaskUpdate} task - The task you're wanting to update.
 */
export const updateTask = async (id: string, task: TaskUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('tasks').update(task).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('proposals');
};

/**
 * Updates Organization In Supabase.
 * @param {string} id - The id of the organization you're wanting to update.
 * @param {OrganizationUpdate} organization - The organization you're wanting to update.
 */
export const updateOrganization = async (id: string, organization: OrganizationUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('organizations').update(organization).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('organizations');
	revalidateTag('proposals');
};

/**
 * Updates Organization's Integration In Supabase.
 * @param {string} id - The id of the organization's integration you're wanting to update.
 * @param {OrganizationIntegrationUpdate} orgIntegration - The organization's integration you're wanting to update.
 */
export const updateOrganizationIntegration = async (id: string, orgIntegration: OrganizationIntegrationUpdate) => {
	const supabase = createClient();
	const { error } = await supabase.from('organization_integrations').update(orgIntegration).eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	revalidateTag('organizations');
	revalidateTag('proposals');
};

export const updateHomeSortCookie = (sort: string) => {
	console.log('updating home cookie', sort);
	const cookieStore = cookies();
	cookieStore.set('homeSort', sort);
	revalidateTag('proposals');
};

type Operation = 'replace';

export type ManageProductUpdate = {
	id: number;
	values: PatchOperation[];
};

type PatchOperation = {
	op: Operation;
	path: string;
	value: string | number;
};

export const updateManageProduct = async (product: ManageProductUpdate): Promise<ProductsItem | undefined> => {
	let data = JSON.stringify(product.values);

	console.log(product.id, data);

	let config = {
		...baseConfig,
		method: 'patch',
		url: `/procurement/products/${product.id}`,
		headers: {
			...baseConfig.headers,
			'Content-Type': 'application/json',
		},
		data: data,
	};

	try {
		const product: AxiosResponse<ProductsItem, Error> = await axios.request(config);

		console.log('SUCCESFULLY UPDATED MANAGE PRODUCT', product.data);

		return product.data;
	} catch (error) {
		console.error(error);
	}
};
