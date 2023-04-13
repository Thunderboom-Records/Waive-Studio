<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Instrument, PlayerCanvas, Rectangle } from '$lib/types/waive';
	import type { BarData } from '$lib/waive/audioEngine/barData';
	import { onMount } from 'svelte';

	export let section: PlayerCanvas;
	let barData: BarData | null;
	export let instrument: Instrument;
	export let i: number;

	const dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	let dragHover: boolean = false;

	// Need to setup the canvas and the context in the onMount
	onMount(() => {
		ctx = canvas.getContext('2d');

		canvas.width = section.canvas.w;
		canvas.height = section.canvas.h;

		drawBar();
	})

	function drawBar() {
		if(ctx === null || typeof(barData) === 'undefined'){
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// For each inner bar we need to draw, call drawRect
		let rects = [
			// set 1
			{ x: 10, y: canvas.height - 70, w: 10, h: 70 },
			{ x: 25, y: canvas.height - 60, w: 10, h: 60 },
			// set 2
			{ x: 50, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 65, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 80, y: canvas.height - 40, w: 10, h: 40 },
			// set 3
			{ x: 105, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 120, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 135, y: canvas.height - 40, w: 10, h: 40 },
			// set 4
			{ x: 160, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 175, y: canvas.height - 50, w: 10, h: 50 },
			{ x: 190, y: canvas.height - 40, w: 10, h: 40 }
		];

		rects.forEach((rect) => {
			if (ctx != null) {
				drawRect(ctx, rect, section.fillColor);
			}
		});
	};

	// Use separate helper functions to draw the shapes we need
	function drawRect(ctx: CanvasRenderingContext2D, rect: Rectangle, fill: string) {
		ctx.fillStyle = fill;
		ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
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
		barData = instrument.arrangement.arrangement[i];
		// console.log();
		drawBar();
	}

</script>

<div
	on:dragenter={dragEnter}
	on:dragleave={() => {dragHover = false}}
	on:drop={dropped}
	on:dragover={(event) => {event.preventDefault()}}
	class="border-white {dragHover ? 'border-2' : 'border-none'}"
>
	<canvas bind:this={canvas} class="bg-red-600/60 rounded">
	</canvas>
</div>
