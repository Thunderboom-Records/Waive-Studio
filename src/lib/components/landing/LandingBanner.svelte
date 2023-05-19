<script lang="ts">

import Carousel from "$lib/components/Carousel.svelte";
import Logo from "$lib/components/Logo.svelte";


let selected = "700"

function select(item: string) {
	selected = item;
}
</script>


<section class="relative h-96 bg-purple-500 w-full flex flex-col justify-center items-center space-y-2 ">
	<div class="mx-auto">
		<Carousel item={selected}/>
	</div>
	<div class="absolute flex flex-row left-4 bottom-8">
		<Logo />
		<Logo />
		<Logo />
	</div>
	<div class="flex flex-row space-x-2">
		<button on:click={() => select("700")} class="btn btn-sm text-white">x</button>
		<button on:click={() => select("800")} class="btn btn-sm text-white">x</button>
		<button on:click={() => select("900")} class="btn btn-sm text-white">x</button>
	</div>
</section>