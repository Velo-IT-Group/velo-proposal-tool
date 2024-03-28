import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getProducts, getProposal, getTicket, getTicketNotes } from '@/lib/functions/read';
import { relativeDate } from '@/utils/date';
import { getCurrencyString } from '@/utils/money';
import { CalendarIcon, DotsHorizontalIcon, FileTextIcon, PlusCircledIcon, StopwatchIcon } from '@radix-ui/react-icons';
import React from 'react';
import ProductList from './product-list';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ExpirationDatePicker from './expiration-date-picker';
import { calculateTotals } from '@/utils/helpers';

type Props = {
	params: { id: string };
};

const ProposalPage = async ({ params }: Props) => {
	const [proposal, products] = await Promise.all([getProposal(params.id), getProducts(params.id)]);

	if (!proposal) return <div></div>;

	const [ticket] = await Promise.all([
		getTicket(proposal?.service_ticket ?? 0),
		// getTicketNotes(proposal?.service_ticket ?? 0)
	]);
	const { ticketHours, totalPrice } = calculateTotals(products, proposal.phases, proposal.labor_rate);

	return (
		<div className='grid grid-cols-12 flex-1'>
			<div className='py-16 pl-12 pr-16 w-full col-span-9 space-y-16'>
				<section className='space-y-4 w-1/2'>
					<h2 className='text-xl font-semibold'>Customer</h2>
					<div className='space-y-1'>
						<Separator />
						<div className='flex justify-between items-center w-full'>
							<div>
								<div className='font-medium text-sm'>{ticket?.contactName}</div>
								<div className='text-sm text-muted-foreground'>{ticket?.contactEmailAddress}</div>
								<HoverCard>
									<HoverCardTrigger asChild>
										<Button variant='link' size='sm' className='px-0 font-normal h-auto leading-5'>
											Edit customer address
										</Button>
									</HoverCardTrigger>
									<HoverCardContent></HoverCardContent>
								</HoverCard>
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant='ghost' size='icon'>
										<DotsHorizontalIcon />
									</Button>
								</DialogTrigger>
							</Dialog>
						</div>
						<Separator />
					</div>
				</section>

				<section className='space-y-4 w-1/2'>
					<h2 className='text-xl font-semibold'>Expiration date</h2>
					<div className='space-y-1'>
						<ExpirationDatePicker id={params.id} expiration_date={proposal.expiration_date ?? undefined} />
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-xl font-semibold flex items-center justify-between gap-2'>
						Products{' '}
						<div className='font-normal text-sm flex items-center text-muted-foreground'>
							{/* <Switch className='mr-2' /> Collect tax automatically */}
						</div>
					</h2>
					<div className='space-y-1'>
						<Separator />
						<ProductList products={products} />
						<Separator />
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-xl font-semibold flex items-center justify-between gap-2'>
						Attachments
						<div className='font-normal text-sm flex items-center text-muted-foreground'>
							<Dialog>
								<DialogTrigger asChild>
									<Button>
										<PlusCircledIcon className='w-4 h-4 mr-2' /> Add attachment
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Add attachment</DialogTitle>
									</DialogHeader>
									<div className='border rounded-md border-dashed min-h-12'></div>
								</DialogContent>
							</Dialog>
							{/* <Switch className='mr-2' /> Collect tax automatically */}
						</div>
					</h2>
					<div className='space-y-1'>
						<Separator />
						<p>Attachments go here.</p>
						{/* <ProductList products={products} /> */}
						<Separator />
					</div>
				</section>

				{/* <section className='space-y-4 w-1/2'>
					<h2 className='text-xl font-semibold'>Memo</h2>
					<div className='space-y-1'>
						<Textarea placeholder='Thanks for your business!' />
					</div>
				</section> */}
			</div>

			<div className='border-l py-16 pl-12 pr-16 w-full col-span-3 space-y-16 bg-muted/50'>
				<div className='space-y-2'>
					<h2 className='text-xl font-semibold'>Summary</h2>
					<p className='text-muted-foreground text-xs uppercase'>Quote exprires {relativeDate(new Date())}</p>
				</div>

				<section className='flex items-start gap-4'>
					<FileTextIcon className='text-primary w-4 h-4' />
					<div className='space-y-3'>
						<h2 className='text-xs'>TOTAL AMOUNT</h2>
						<p className='text-muted-foreground font-medium text-sm uppercase'>{getCurrencyString(totalPrice)}</p>
						<p className='text-muted-foreground text-xs'>Bills when quote is accepted</p>
					</div>
				</section>

				<section className='flex items-start gap-4'>
					<StopwatchIcon className='text-primary w-4 h-4' />
					<div className='space-y-3'>
						<h2 className='text-xs'>LABOR HOURS</h2>
						<p className='text-muted-foreground font-medium text-sm'>{ticketHours ?? 0} hrs</p>
					</div>
				</section>

				<section className='flex items-start gap-4'>
					<CalendarIcon className='text-primary w-4 h-4' />
					<div className='space-y-3'>
						<h2 className='text-xs'>EXPIRATION DATE</h2>
						{proposal.expiration_date ? (
							<p className='text-muted-foreground font-medium text-sm'>
								{new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date(proposal.expiration_date))}
							</p>
						) : (
							<p className='text-muted-foreground font-medium text-sm'>No expiration date.</p>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default ProposalPage;
