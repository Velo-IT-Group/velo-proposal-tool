import Link from 'next/link';
import React from 'react';
import VeloLogo from './icons/VeloLogo';
import { SlashIcon } from '@radix-ui/react-icons';
import { getOrganization } from '@/lib/functions/read';
import NavigationTabs from './NavigationTabs';
import UserNav from './UserNav';
import { createClient } from '@/utils/supabase/server';

export type Tab = {
	name: string;
	href: string;
};

type Props = {
	title?: string;
	children?: React.ReactNode;
	org: string;
	tabs?: Tab[];
};

const Navbar = async ({ title, children, org, tabs }: Props) => {
	const supabase = createClient();
	const organization = await getOrganization();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<nav className='flex items-center gap-4 w-full px-8 h-16 relative bg-background'>
				{org ? (
					<>
						<Link href={`/${org}`}>
							<VeloLogo classname='w-6 h-6' />
						</Link>
						<SlashIcon className='h-4 opacity-15' />
					</>
				) : (
					<VeloLogo classname='w-6 h-6' />
				)}

				<Link href={`/${org}`} className='font-semibold hover:underline'>
					{organization?.name ?? ''}
				</Link>

				{title && (
					<>
						<SlashIcon className='h-4 opacity-15' />
						<span className='font-semibold'>{title}</span>
					</>
				)}
				{(children || user) && (
					<div className='ml-auto flex items-center gap-4'>
						{children}
						{user && (
							<>
								{/* <Button variant='outline' size='icon'>
									<BellIcon className='h-4 w-4' />
								</Button> */}

								<UserNav user={user} />
							</>
						)}
					</div>
				)}
			</nav>
			{tabs && <NavigationTabs tabs={tabs} />}
		</>
	);
};

export default Navbar;
