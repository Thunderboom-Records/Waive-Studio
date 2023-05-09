<script lang="ts">
	import { colors, drawDrumBar, drawNoteBar } from '$lib/scripts/renderCanvas';
	import { InstrumentType, type Instrument, type Bar } from '$lib/types/waive';
	import { onMount } from 'svelte';

	export let bar: Bar;
	export let instrument: Instrument;
	export let i: number;
	export let selectedIndex: number | null;

	let canvas: HTMLCanvasElement;
	
	function select(){
		selectedIndex = i;
	}

	function dragStart(event: any){
		select();
		let data = {
			index: i, 
			type: instrument.type
		}
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
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
<canvas
	bind:this={canvas}
	on:click={select}
	class="flex flex-row rounded-md h-full bg-{instrument.color}-600 cursor-pointer min-w-pattern w-pattern
			border-{instrument.color}-500 border-2 {i === selectedIndex ? 'border-solid': 'border-none'}"
	draggable="true"
	on:dragstart={dragStart}
/>
