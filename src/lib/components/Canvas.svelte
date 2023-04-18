<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { InstrumentType, type Instrument, type PlayerCanvas, type Rectangle } from '$lib/types/waive';
	import type { BarData } from '$lib/waive/audioEngine/barData';
	import { drawNoteBar, drawDrumBar, colors } from '$lib/scripts/renderCanvas';
	import type { Writable } from 'svelte/store';
	import type { Arrangement } from '$lib/waive/audioEngine/arrangement';

	export let section: PlayerCanvas;
	export let instrument: Instrument;
	export let i: number;

	export let arrangementStore: Writable<Arrangement>;
	
	const dispatch = createEventDispatcher();
	
	let barData: BarData | null;
	let canvas: HTMLCanvasElement;

	let dragHover: boolean = false;

	let color: string = "white";
	if(typeof instrument.color == 'string') {
		color = colors[instrument.color][500];
	}

	// Need to setup the canvas and the context in the onMount
	onMount(() => {
		canvas.width = section.canvas.w;
		canvas.height = section.canvas.h;

		arrangementStore.subscribe(v => {
			barData = v.arrangement[i];
			updateCanvas();
		});

		updateCanvas();
	})

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

	function dropped(event: any){
		event.preventDefault;
		const data = JSON.parse(event.dataTransfer.getData("text/plain"));
		dragHover = false;

		if(data.type !== instrument.type){
			return
		}

		data.i = i;
		dispatch("addBar", data);
	}

</script>

<div
	on:dragenter={dragEnter}
	on:dragleave={() => {dragHover = false}}
	on:drop={dropped}
	on:dragover={(event) => {event.preventDefault()}}
	class="border-white {dragHover ? 'border-2' : 'border-none'}"
>
	<canvas bind:this={canvas} class="bg-{instrument.color}-500 bg-opacity-10 rounded">
	</canvas>
</div>
