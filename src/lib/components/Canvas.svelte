<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { InstrumentType, type Instrument, type PlayerCanvas, type Rectangle } from '$lib/types/waive';
	import type { BarData } from '$lib/waive/audioEngine/barData';
	import { drawNoteBar, drawDrumBar, colors } from '$lib/scripts/renderCanvas';

	export let section: PlayerCanvas;
	export let instrument: Instrument;
	export let i: number;
	
	const dispatch = createEventDispatcher();
	
	let barData: BarData | null;
	let barIndex: number;
	let canvas: HTMLCanvasElement;

	let dragHover: boolean = false;

	let color: string = "white";
	if(typeof instrument.color == 'string') {
		color = colors[instrument.color][500];
	}

	onMount(() => {
		canvas.width = section.canvas.w;
		canvas.height = section.canvas.h;

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

	function dragStart(event: any){
		event.preventDefault;
		const data = {
			index: barIndex, 
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
		barData = instrument.arrangement.arrangement[i];
		updateCanvas();
	}

</script>

<div
	draggable={barData ? "true" : "false"}
	on:dragstart={dragStart}
	on:dragenter={dragEnter}
	on:dragleave={() => {dragHover = false}}
	on:drop={dropped}
	on:dragover={(event) => {event.preventDefault()}}
	class="border-white {dragHover ? 'border-2' : 'border-none'}"
>
	<canvas bind:this={canvas} class="bg-{instrument.color}-500 bg-opacity-10 rounded">
	</canvas>
</div>
