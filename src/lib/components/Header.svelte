<script lang="ts">
	import type { Route } from '$lib/types/route';
	import NavLink from '$lib/components/NavLink.svelte';
	import Logo from "$lib/components/Logo.svelte";
	import { DummyIcon } from "$lib/content/content";

	export let routes: Route[];

</script>

<header class="absolute w-full z-20 bg-transparent flex-grow-0 flex-shrink-0 flex-auto">
	<nav class="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
		<div class="flex w-full items-center justify-between py-6 ">
			<div class="flex w-full items-center justify-between">
				<Logo icon={ DummyIcon } href="/"/>
				<div class="flex flex-row space-x-8">
					{#each routes as route, index}
						{#if index === routes.length - 1}
							<div class="divider divider-horizontal"></div>
						{/if}
						<NavLink href={route.href}>{route.label}</NavLink>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>