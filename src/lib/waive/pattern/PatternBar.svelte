<script lang="ts">
	import { colors, drawDrumBar, drawNoteBar } from '$lib/scripts/renderCanvas';
	import { InstrumentType, type Instrument, type Bar } from '$lib/types/waive';
	import { createEventDispatcher, onMount } from 'svelte';

	export let bar: Bar;
	export let instrument: Instrument;
	export let i: number;
	export let selectedIndex: number | null;

	let canvas: HTMLCanvasElement;
	let mouseOver = false;
	
	const dispatch = createEventDispatcher();

	function select(){
		selectedIndex = i;
	}

	function dragStart(event: any){
		select();
		let data = {
			index: i, 
			barData: bar.barData,
			type: instrument.type
		}
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function deleteClip(){
		dispatch("deleteClip", i);
	}

	onMount(() => {
		let color: string = "white";
		
		let rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		if(typeof instrument.color == 'string') {
			color = colors[instrument.color][500];
		}
		
		if(instrument.type === InstrumentType.DRUMS){
			drawDrumBar(canvas, bar.barData, color);
		} else {
			drawNoteBar(canvas, bar.barData, color);
		}
	})

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={select}
	on:mouseenter={() => mouseOver = true}
	on:mouseleave={() => mouseOver = false}
	class="relative"
>

	<canvas
		bind:this={canvas}
		class="flex flex-row rounded-md h-full bg-{instrument.color}-600 cursor-pointer min-w-pattern w-pattern
		border-{instrument.color}-500 border-2 {i === selectedIndex ? 'border-solid': 'border-none'}"
		draggable="true"
		on:dragstart={dragStart}
	/>
	{#if mouseOver}
	<button 
		class="absolute top-0 right-0 text-gray-400 bg-gray-800 bg-opacity-80 px-2"
		on:click={deleteClip}
	>
		X
	</button>
	{/if}
</div>