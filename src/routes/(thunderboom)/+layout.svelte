<script lang="ts">
	import type { Route } from '$lib/types/route';

	import '$lib/styles/app.postcss';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let routes: Route[] = [
		{ href: '/waive/player', label: 'Waive' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' },
		{ href: '/team', label: 'Team' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<svelte:head>
	<title>Thunderboom Records</title>
</svelte:head>

<div class="bg-slate-800 min-h-screen">
	<Header {routes} />
	<div class="flex flex-col ">
		<slot />
		<Footer />
	</div>
</div>
