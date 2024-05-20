import React from 'react';
import { getProducts, getProposal } from '@/lib/functions/read';
import { getCatalogItems } from '@/utils/manage/read';
import ProductsList from './products-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CatalogPicker from './catalog-picker';
import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import ProductSection from './product-section';
import { createSection } from '@/lib/functions/create';
import SectionTabs from './section-tabs';

type Props = {
	params: { org: string; id: string; version: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const ProposalProductPage = async ({ params, searchParams }: Props) => {
	const search = typeof searchParams.search === 'string' ? String(searchParams.search) : undefined;
	const identifier = typeof searchParams.identifier === 'string' ? String(searchParams.identifier) : undefined;
	const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
	const { catalogItems, count } = await getCatalogItems(search, identifier, page);
	const proposal = await getProposal(params.id, params.version);
	const products = await getProducts(params.version);

	if (!proposal) {
		return <div></div>;
	}

	return (
		<main className='grow px-6 py-4 w-full space-y-4 flex flex-col bg-muted/40'>
			<SectionTabs
				params={params}
				sections={proposal.working_version.sections}
				version={proposal.working_version.id}
				proposal={proposal.id}
				catalogItems={catalogItems}
				count={count}
				page={page}
			/>
		</main>
	);
};

export default ProposalProductPage;
