<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import type { BarData } from '$lib/waive/audioEngine/barData';
	import { drawNoteBar, drawDrumBar, colors } from '$lib/scripts/renderCanvas';
	import type { Writable } from 'svelte/store';
	import type { Arrangement } from '$lib/waive/audioEngine/arrangement';

	export let instrument: Instrument;
	export let i: number;

	export let arrangementStore: Writable<Arrangement>;
	
	const dispatch = createEventDispatcher();
	
	let barData: BarData | null;
	let barIndex: number;
	let canvas: HTMLCanvasElement;

	let dragHover: boolean = false;
	let mouseOver: boolean = false;

	let color: string = "white";
	if(typeof instrument.color == 'string') {
		color = colors[instrument.color][500];
	}

	onMount(() => {
		resize()
		window.addEventListener("resize", resize);

		arrangementStore.subscribe(v => {
			barData = v.arrangement[i];
			updateCanvas();
		});

		return () => {
			window.removeEventListener("resize", resize);
		}
	})

	function resize(){
		let rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		updateCanvas();
	}

	function updateCanvas(){
		if(instrument.type === InstrumentType.DRUMS){
			drawDrumBar(canvas, barData, color);
		} else {
			drawNoteBar(canvas, barData, color);
		}
	}

	function dragEnter(event: any){
		event.preventDefault;
		const data = JSON.parse(event.dataTransfer.getData("text/plain"));

		if(data.type === instrument.type){
			dragHover = true;
		}
	}

	function dragStart(event: any){
		event.preventDefault;
		const data = {
			index: barIndex,
			barData: barData,
			type: instrument.type
		}
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function dropped(event: any){
		event.preventDefault;
		const data = JSON.parse(event.dataTransfer.getData("text/plain"));
		dragHover = false;

		if(data.type !== instrument.type){
			return
		}

		data.i = i;
		barIndex = data.index;
		dispatch("addBar", data);
	}

	function deleteBar(){
		dispatch("removeBar", {i, type: instrument.type})
	}

	function requestVariation(){
		dispatch("newClip", {variation: true, z: barData?.z, add: i});
	}
</script>

<div
	on:dragenter={dragEnter}
	on:dragleave={() => {dragHover = false}}
	on:drop={dropped}
	on:dragover={(event) => {event.preventDefault()}}
	on:mouseenter={() => mouseOver = true}
	on:mouseleave={() => mouseOver = false}
	class="relative h-full w-full"
>
	<canvas
		draggable={barData ? "true" : "false"}
		on:dragstart={dragStart}
		bind:this={canvas}
		class="bg-{instrument.color}-500 bg-opacity-10 rounded w-full h-full m-0 b-0"
	/>
	{#if barData && mouseOver}
	<button
		class="absolute top-0 left-0 text-gray-400 bg-gray-800 bg-opacity-80 py-0 px-2"
		on:click={requestVariation}
	>
		var
	</button>
	<button 
		class="absolute top-0 right-0 text-gray-400 bg-gray-800 bg-opacity-80 py-0 px-2" 
		on:click={deleteBar}
	>X</button>
	{/if}
	<div class="absolute bottom-0 left-0 w-full h-full box-border border-white {dragHover ? 'border-4' : 'border-none'} pointer-events-none z-20" />
</div>
