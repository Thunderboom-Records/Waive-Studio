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

	<main class="min-w-screen min-h-screen bg-gray-800 p-6 ">
		<div class="rounded-xl border border-gray-500 bg-gray-800 p-6 shadow-2xl shadow-gray-600">
			<slot />
		</div>
	</main>

	<Footer />
</div>
