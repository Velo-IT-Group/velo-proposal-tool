'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useCallback, useEffect, useTransition } from 'react';
import { catalogColumns } from './columns';
import { CatalogItem } from '@/types/manage';
import { ExpandedState, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { createProduct } from '@/lib/functions/create';
import Search from '@/components/Search';
import { ProductState } from '@/types/optimisticTypes';
import { usePagination } from '@/app/hooks/usePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
	proposal: string;
	catalogItems: CatalogItem[];
	params: { org: string; id: string };
	page: number;
	count: number;
	searchParams?: { [key: string]: string | string[] | undefined };
};

const CatalogPicker = ({ proposal, catalogItems, params, count }: Props) => {
	const [expanded, setExpanded] = React.useState<ExpandedState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { limit, onPaginationChange, pagination } = usePagination();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const pageCount = Math.round(count / limit);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		router.push(pathname + '?' + createQueryString('page', `${pagination.pageIndex + 1}`));
	}, [createQueryString, pagination, pathname, router, searchParams]);

	const productInsert = async (product: ProductInsert, bundledItems?: ProductInsert[]) => {
		await createProduct({ ...product, proposal }, bundledItems);
	};

	// console.log(catalogItems);

	const table = useReactTable<CatalogItem>({
		data: catalogItems,
		columns: catalogColumns,
		getCoreRowModel: getCoreRowModel(),
		onExpandedChange: setExpanded,
		getExpandedRowModel: getExpandedRowModel(),
		onRowSelectionChange: setRowSelection,
		enableExpanding: true,
		getRowId: (row) => row.id.toString(),
		getSubRows: (row) => row?.bundledItems,
		meta: {
			productInsert,
		},
		manualPagination: true,
		onPaginationChange: onPaginationChange,
		pageCount: pageCount,
		state: {
			rowSelection,
			expanded,
			pagination,
		},
	});

	return (
		<DialogContent className='max-w-none w-w-padding h-w-padding flex flex-col space-y-3'>
			<DialogHeader>
				<DialogTitle>Add Products</DialogTitle>
			</DialogHeader>

			<div className='col-span-3 space-y-4'>
				<div className='grid grid-cols-[250px_1fr] gap-4'>
					<Search baseUrl={`/${params.org}/proposal/${params.id}/products`} placeholder='Search by identifier...' queryParam='identifier' />
					<Search baseUrl={`/${params.org}/proposal/${params.id}/products`} placeholder='Search by description...' />
				</div>

				<DataTable table={table} />

				<div className='flex items-center justify-end space-x-2 py-4'>
					<Button variant='outline' size='sm' type='button' onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button variant='outline' size='sm' type='button' onClick={table.nextPage} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>

			<DialogFooter>
				<DialogClose asChild>
					<Button>Save</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};

export default CatalogPicker;
