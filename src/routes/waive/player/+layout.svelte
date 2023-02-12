<script lang="ts">
	import type { Route } from '$lib/types/route';

	import '$lib/styles/app.postcss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let routes: Route[] = [
		{ href: '/waive/player', label: 'Player' },
		{ href: '/waive/samples', label: 'Samples' },
		{ href: '/waive/docs', label: 'Documentation' }
	];
</script>

<svelte:head>
	<title>Waive Studio</title>
</svelte:head>

<div>
	<Header {routes} />
	<main class="min-h-screen min-w-screen bg-gray-800 p-8">
		<slot />
	</main>
	<Footer />
</div>
