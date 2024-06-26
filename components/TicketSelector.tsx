'use client';

import * as React from 'react';

import { type ServiceTicket } from '@/types/manage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TicketSelector = ({ tickets, ticket }: { tickets: ServiceTicket[]; ticket?: number | null }) => {
	console.log(ticket);
	return (
		<Select name='service_ticket' defaultValue={ticket ? String(ticket) : undefined}>
			<SelectTrigger className='col-span-3' tabIndex={2}>
				<SelectValue placeholder='Select a ticket' />
			</SelectTrigger>
			<SelectContent>
				{tickets.map((ticket) => (
					<SelectItem key={ticket.id} value={String(ticket.id)}>
						#{ticket.id} - {ticket.summary}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default TicketSelector;
