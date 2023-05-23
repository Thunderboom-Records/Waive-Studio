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


<section class="relative overflow-hidden min-h-[70vh]  bg-gradient-to-b from-purple-600 from-40% to-purple-500 w-full flex flex-col justify-center items-center space-y-2 lg:space-y-8">
	<div class="z-20 mx-auto max-w-[80vw] flex justify-center items-center">
		<Carousel item={selected}/>
	</div>
	<div class="flex flex-row space-x-2">
		{#each items as item, index}
			<input type="radio" name="radio-1" bind:group={items} class="radio w-3 h-3 border-0 checked:bg-white bg-gray-400/20" checked />
		{/each}
	</div>

	<div class="z-20 absolute flex flex-row left-16 bottom-8 space-x-4">
		<Logo icon={ DummyIcon } />
		<Logo icon={ DummyIcon } />
		<Logo icon={ DummyIcon } />
	</div>
	<div class="shadow-none z-0 absolute left-0 bottom-0 translate-y-40 -translate-x-80 rounded-full bg-purple-600 w-[60rem] h-[60rem]">

	</div>
</section>