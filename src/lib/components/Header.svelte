<script lang="ts">
	import type { Route } from '$lib/types/route';
	import NavLink from '$lib/components/NavLink.svelte';
	import Logo from "$lib/components/Logo.svelte";
	import { DummyIcon } from "$lib/content/content";
	export let routes: Route[];
</script>

<header class="sticky w-full z-20 bg-purple-500 flex-grow-0 flex-shrink-0 flex-auto">
	<nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
		<div class="flex w-full items-center justify-between py-6 ">
			<div class="flex w-full items-center justify-between">
				<Logo icon={ DummyIcon } href="/"/>
				<div class="flex flex-row space-x-8 justify-center items-center">
					{#each routes as route, index}
						{#if index === routes.length - 1}
							<div class="w-0 h-8 border-[1px] border-white/80"></div>
						{/if}
						<NavLink href={route.href}>
							<p class="font-extralight tracking-wider">
								{route.label.toUpperCase()}
							</p>
						</NavLink>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>