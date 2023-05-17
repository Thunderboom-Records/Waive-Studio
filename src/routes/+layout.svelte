<script lang="ts">
	import type { Route } from '$lib/types/route';

	import '$lib/styles/app.postcss';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let routes: Route[] = [
		{ href: '/studio', label: 'Studio' },
		{ href: '/tutorials', label: 'Tutorials' },
		{ href: '/events', label: 'Events' },
		{ href: '/about', label: 'About' },
	];
</script>

<svelte:head>
	<title>Thunderboom Records</title>
</svelte:head>

<div class="min-h-screen bg-gray-800 flex flex-col">
	<Header {routes} />
	<main class="flex-grow-1 flex-shrink-0 flex-auto">
		<slot />
	</main>
	<Footer />
</div>
