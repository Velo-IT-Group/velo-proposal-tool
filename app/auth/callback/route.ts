import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);

	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the SSR package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/server-side/nextjs
	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/velo-it-group';

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.delete({ name, ...options });
					},
				},
			}
		);
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (error) {
			return NextResponse.redirect(`${origin}/login?error=${error}`);
		}
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(`${origin}${next}`);
}
export async function POST(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	console.log('STUFF RUNNING ON SERVER ROUTE');

	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the SSR package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/server-side/nextjs
	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/velo-it-group';

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.delete({ name, ...options });
					},
				},
			}
		);
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (error) {
			return NextResponse.redirect(`${origin}/login?error=${error}`);
		}
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(`${origin}${next}`);
}
