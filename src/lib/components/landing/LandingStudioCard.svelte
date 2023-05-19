<script lang="ts">
	import type {LandingStudioCardContent} from "$lib/types/route";
	import dawScreenshot from '$lib/assets/waive-studio.jpeg';
	export let content: LandingStudioCardContent;
</script>

<div class="bg-white w-full max-w-3xl">
	<div class="py-16 px-12 flex flex-row justify-start items-center relative isolate overflow-hidden bg-gradient-to-r from-gray-600 to-gray-800">
		<div class="max-w-md text-left text-white space-y-4">
			<h2 class="text-3xl font-bold tracking-tight ">{content.title}</h2>
			<p class="text-md text-start">{content.description}</p>
			<div class="flex items-center gap-x-6 justify-start">
				{#each content.links as link}
					<a href={link.href} class="text-sm leading-6 text-white">{link.label.toUpperCase()} <span aria-hidden="true" class="text-purple-600"> > </span></a>
				{/each}

			</div>
		</div>
		<div class="relative h-80 ">
			<img class="absolute -rotate-12 left-10 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src={dawScreenshot} alt="App screenshot" width="1824" height="1080">
		</div>
	</div>
</div>
