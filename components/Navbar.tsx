import Link from 'next/link';
import React from 'react';
import VeloLogo from './icons/VeloLogo';
import { SlashIcon } from '@radix-ui/react-icons';
import NavigationTabs from './NavigationTabs';
import UserNav from './UserNav';
import { createClient } from '@/utils/supabase/server';
import NavbarTitleEditor from './navbar-title-editor';
import { cookies } from 'next/headers';

export type Tab = {
	name: string;
	href: string;
};

type Props = {
	title?: string;
	titleEditable?: boolean;
	titleId?: string;
	children?: React.ReactNode;
	org: string;
	version?: number;
	tabs?: Tab[];
};

const Navbar = async ({ title, titleEditable, titleId, children, org, version, tabs }: Props) => {
	const cookieStore = cookies();
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<nav className='flex flex-col sm:flex-row items-center gap-4 w-full px-8 h-16 bg-background'>
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

				{org && (
					<Link
						href={`/${org}`}
						className='font-semibold hover:underline'
					>
						Velo IT Group
					</Link>
				)}

				{title && (
					<>
						<SlashIcon className='h-4 opacity-15' />
						{titleEditable && titleId ? (
							<>
								<NavbarTitleEditor
									id={titleId}
									title={title}
								/>
							</>
						) : (
							<>
								<span className='font-semibold'>{title}</span>
							</>
						)}
					</>
				)}

				{version && (
					<>
						<SlashIcon className='h-4 opacity-15' />
						<span className='font-semibold'>{`V${version}`}</span>
					</>
				)}

				{(children || user) && (
					<div className='ml-auto flex items-center gap-4'>
						{children}
						{user && (
							<>
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
