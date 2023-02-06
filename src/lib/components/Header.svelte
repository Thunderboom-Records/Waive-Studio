<script lang="ts">
	import type { Route } from '$lib/types/route';
	import NavLink from './NavLink.svelte';

	export let routes: Route[];
</script>

<header class="bg-gray-900">
	<nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
		<div
			class="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none"
		>
			<div class="flex items-center">
				<a href="/">
					<span class="sr-only">Your Company</span>
					<img
						class="h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=white"
						alt=""
					/>
				</a>
				<div class="ml-10 hidden space-x-8 lg:block">
					{#each routes as route}
						<NavLink href={route.href}>{route.label}</NavLink>
					{/each}
				</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
			{#each routes as route}
				<NavLink href={route.href}>{route.label}</NavLink>
			{/each}
		</div>
	</nav>
</header>
