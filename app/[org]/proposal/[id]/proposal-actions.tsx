'use client';

import * as React from 'react';
import { Dialog } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { deleteProposal } from '@/lib/functions/delete';
import SubmitButton from '@/components/SubmitButton';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { updatePhase } from '@/lib/functions/update';

type Props = {
	proposal: Proposal;
	phases: Phase[];
	tickets: Ticket[];
	tasks: Task[];
};

const ProposalActions = ({ proposal, phases, tickets, tasks }: Props) => {
	const [open, setIsOpen] = React.useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='secondary'>
						<span className='sr-only'>Actions</span>
						<DotsHorizontalIcon className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onSelect={() => setIsOpen(true)}>Content filter preferences</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className='text-red-600'>
						Delete proposal
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={open} onOpenChange={setIsOpen}>
				<DialogContent className='max-h-w-padding-padding min-h-0 flex flex-col overflow-auto'>
					<DialogHeader>
						<DialogTitle>Content filter preferences</DialogTitle>
						<DialogDescription>
							The content filter flags text that may violate our content policy. It&apos;s powered by our moderation endpoint which is free to use to
							moderate your OpenAI API traffic. Learn more.
						</DialogDescription>
					</DialogHeader>

					<Accordion type='single' collapsible className='w-full py-6'>
						<h4 className='text-sm text-muted-foreground'>Playground Warnings</h4>

						<AccordionItem value='show_phases'>
							<div className='flex items-start space-x-4 pt-3'>
								<Switch name='show_phases' id='show_phases' defaultChecked={true} />
								<Label className='grid gap-1 font-normal' htmlFor='show_phases'>
									<span className='font-semibold'>Show phases</span>
									<AccordionTrigger className='text-sm text-muted-foreground pt-0'>Customize which phases are shown?</AccordionTrigger>
								</Label>
							</div>
							<AccordionContent className='space-y-2'>
								{phases.map((phase) => (
									<Card key={phase.id}>
										<CardContent className='flex items-center gap-2 justify-between w-full p-3'>
											<CardTitle>{phase.description}</CardTitle>
											<Switch
												onClick={(e) => {
													console.log(e);
												}}
												formAction={async (data) => {
													console.log(data);
													const visible = data.get('visible') as unknown as boolean;
													console.log(visible);
													await updatePhase(phase.id, { visible });
												}}
												type='submit'
												name='visible'
												defaultChecked={phase.visible ?? false}
											/>
										</CardContent>
									</Card>
								))}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='show_tickets'>
							<div className='flex items-start space-x-4 pt-3'>
								<Switch name='show_tickets' id='show_tickets' defaultChecked={true} />
								<Label className='grid gap-1 font-normal' htmlFor='show_tickets'>
									<span className='font-semibold'>Show tickets</span>
									<AccordionTrigger className='text-sm text-muted-foreground pt-0'>Customize which tickets are shown?</AccordionTrigger>
								</Label>
							</div>
							<AccordionContent className='space-y-2'>
								{tickets.map((ticket) => (
									<Card key={ticket.id}>
										<CardContent className='flex items-center gap-2 justify-between w-full p-3'>
											<CardTitle>{ticket.summary}</CardTitle>
											<Switch defaultChecked={ticket.visible ?? false} />
										</CardContent>
									</Card>
								))}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='show_tasks'>
							<div className='flex items-start space-x-4 pt-3'>
								<Switch name='show_tasks' id='show_tasks' defaultChecked={true} />
								<Label className='grid gap-1 font-normal' htmlFor='show_tasks'>
									<span className='font-semibold'>Show tasks</span>
									<AccordionTrigger className='text-sm text-muted-foreground pt-0'>Customize which tasks are shown?</AccordionTrigger>
								</Label>
							</div>

							<AccordionContent className='space-y-2'>
								{tasks.map((ticket) => (
									<Card key={ticket.id}>
										<CardContent className='flex items-center gap-2 justify-between w-full p-3'>
											<CardTitle>{ticket.summary}</CardTitle>
											<Switch defaultChecked={false} />
										</CardContent>
									</Card>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<DialogFooter>
						<Button variant='secondary' onClick={() => setIsOpen(false)}>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This proposal will no longer be accessible by you or others you&apos;ve shared it with.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<SubmitButton
							variant='destructive'
							formAction={async () => {
								await deleteProposal('');
								setShowDeleteDialog(false);
							}}
						>
							Delete proposal
						</SubmitButton>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ProposalActions;
