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

			<!-- Color placeholders for TW while developing -->
			<p class="bg-red-600 bg-red-500 text-red-500 text-red-600">color placeholder</p>

			<p class="bg-orange-600 bg-orange-500 text-orange-500 text-orange-600">color placeholder</p>

			<p class="bg-purple-600 bg-purple-500 text-purple-500 text-purple-600">color placeholder</p>

			<p class="bg-green-600 bg-green-500 text-green-500 text-green-600">color placeholder</p>

			<p class="bg-blue-600 bg-blue-500 text-blue-500 text-blue-600">color placeholder</p>
		</div>
	</nav>
</header>
