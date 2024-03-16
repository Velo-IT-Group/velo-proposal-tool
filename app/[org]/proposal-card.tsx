import { CircleIcon, Pencil1Icon, StarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import ProposalOptions from './proposal-options';
import { statuses } from './proposal/[id]/products/data/data';
import { relativeDate } from '@/utils/date';
import { calculateTotals } from '@/utils/helpers';
import { getCurrencyString } from '@/utils/money';

export function ProposalCard({ proposal, orgId }: { proposal: Proposal; orgId: string }) {
	const status = statuses.find((status) => status.value === 'inProgress');
	const { totalPrice } = calculateTotals(proposal?.products ?? [], proposal?.phases ?? [], proposal.labor_rate);

	return (
		<Card className='flex flex-col'>
			<CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
				<div className='space-y-1'>
					<CardTitle>{proposal.name}</CardTitle>
					<CardDescription>{getCurrencyString(totalPrice)}</CardDescription>
				</div>
				<div className='flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground'>
					<Button variant='secondary' className='px-3 shadow-none'>
						<Link href={`/${orgId}/proposal/${proposal.id}`}>
							<Pencil1Icon className='mr-2 h-4 w-4' />
						</Link>
						Edit
					</Button>
					<Separator orientation='vertical' className='h-[20px]' />
					<ProposalOptions proposalId={proposal.id} orgId={orgId} />
				</div>
			</CardHeader>
			<CardContent className='mt-auto'>
				<div className='flex items-center justify-between space-x-4 text-sm text-muted-foreground'>
					<div className='flex items-center'>
						{status && (
							<>
								{status.icon && <status.icon className='mr-1 h-3 w-3 text-muted-foreground' />}
								<span className='whitespace-nowrap'>{status.label}</span>
							</>
						)}
						{/* <CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
						TypeScript */}
					</div>

					{/* <div className='flex items-center'>
						<StarIcon className='mr-1 h-3 w-3' />
						20k
					</div> */}

					<div className='flex items-center text-muted-foreground text-xs animate-in fade-in truncate capitalize'>
						Updated {relativeDate(new Date(proposal.updated_at))}
					</div>
					{/* <div>Updated April 2023</div> */}
				</div>
			</CardContent>
		</Card>
	);
}
