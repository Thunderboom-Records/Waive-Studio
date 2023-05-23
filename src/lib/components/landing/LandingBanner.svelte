<script lang="ts">

import Carousel from "$lib/components/Carousel.svelte";
import Logo from "$lib/components/Logo.svelte";
import {DummyIcon, LandingBannerContentDummy} from "$lib/content/content";
import type {CarouselItem, LandingBannerContent} from "$lib/types/route";


let selected = "700"

export let content: LandingBannerContent = LandingBannerContentDummy;

let items: CarouselItem[];

$: items = content.items;

</script>


<section class="relative min-h-[32rem] lg:min-h-[70vh] bg-gradient-to-b from-purple-600 to-purple-500 w-full flex flex-col justify-center items-center space-y-2 lg:space-y-8">
	<div class="mx-auto">
		<Carousel item={selected}/>
	</div>
	<div class="absolute flex flex-row left-4 bottom-8">
		<Logo icon={ DummyIcon } />
		<Logo icon={ DummyIcon } />
		<Logo icon={ DummyIcon } />
	</div>
	<div class="flex flex-row space-x-2">
		{#each items as item, index}
			<input type="radio" name="radio-1" bind:group={items} class="radio w-3 h-3 border-0 checked:bg-white bg-gray-400/20" checked />
		{/each}
	</div>
</section>