import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Velo Proposal Tool',
};

// export const viewport: Viewport = {
// 	themeColor: [
// 		{ media: '(prefers-color-scheme: light)', color: 'white' },
// 		{ media: '(prefers-color-scheme: dark)', color: 'black' },
// 	],

// };

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang='en'
			className={inter.className}
		>
			<head />
			<body className='min-h-full relative max-w-full'>
				<div>{children}</div>
				<Toaster />
			</body>
		</html>
	);
}
