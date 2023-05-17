<script lang="ts">
	import type { Route } from '$lib/types/route';
	import NavLink from '$lib/components/NavLink.svelte';
	import Logo from "$lib/components/Logo.svelte";

	export let routes: Route[];
</script>

<header class="bg-purple-500 flex-grow-0 flex-shrink-0 flex-auto">
	<nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
		<div
			class="flex w-full items-center justify-between  py-6 ">
			<div class="w-full flex items-center justify-between">
				<Logo />
				<div class="ml-10 space-x-8 ">
					{#each routes as route}
						<NavLink href={route.href}>{route.label}</NavLink>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>
