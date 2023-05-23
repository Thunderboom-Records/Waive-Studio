<script lang="ts">
	import type {LandingStudioContent} from "$lib/types/route";
	import dawScreenshot from '$lib/assets/waive-studio.jpeg';
	export let content: LandingStudioContent;
</script>

<div class="bg-white w-full max-w-[60vw]">
	<div class="py-4 px-12 flex flex-row space-x-4 justify-start items-center relative isolate overflow-hidden bg-gradient-to-r from-gray-600 to-black">
		<div class="max-w-md text-left text-white space-y-4 lg:space-y-8">
			<h2 class="text-3xl lg:text-5xl tracking-wide">{content.title}</h2>
			<p class="text-md lg:text-xl font-light text-start">{content.description}</p>
			<div class="flex items-center tracking-wider gap-x-6 justify-start">
				{#each content.links as link}
					<a href={link.href} class="text-sm lg:text-lg leading-6 text-white">{link.label.toUpperCase()} <span aria-hidden="true" class="text-purple-600"> > </span></a>
				{/each}

			</div>
		</div>
		<div class="relative h-80">
			<img class="absolute -rotate-12 -translate-y-10 left-10 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src={dawScreenshot} alt="App screenshot" width="1824" height="1080">
		</div>
	</div>
</div>
