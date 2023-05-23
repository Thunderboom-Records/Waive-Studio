<script lang="ts">

	import LandingStudioCard from "$lib/components/landing/LandingStudioCard.svelte";
	import type {LandingStudioContent} from "$lib/types/route";
	import { LandingStudioContentDummy } from "$lib/content/content";

	let content: LandingStudioContent = LandingStudioContentDummy;
</script>

<div class="flex flex-col w-full bg-gray-700 space-y-12 py-24 px-8 justify-center items-center">
	<h2 class="text-white text-6xl w-full max-w-3xl">
		Studio
	</h2>

	{#each content.apps as app}
		<LandingStudioCard content={app}/>
	{/each}
</div>