<script lang="ts">
	import type { PlayerCanvas, Rectangle } from '$lib/types/waive';
	import { onMount } from 'svelte';

	// Allow parent to explicitly set height and width
	export let section: PlayerCanvas;

	let canvas: HTMLCanvasElement;

	// Need to setup the canvas and the context in the onMount
	onMount(() => {
		let ctx = canvas.getContext('2d');

		canvas.width = section.canvas.w;
		canvas.height = section.canvas.h;

		if (section.sample != undefined) {
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
					drawRect(ctx, rect, section.fill);
				}
			});
		}
	});

	// Use seperate helper functions to draw the shapes we need
	function drawRect(ctx: CanvasRenderingContext2D, rect: Rectangle, fill: string) {
		ctx.fillStyle = fill;
		ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
	}

	function remove() {}
</script>

<div class="relative">
	{#if section.sample != undefined}
		<label
			for="canvas"
			class="absolute z-10 top-1 text-gray-400 text-xs bg-gray-800/60 rounded-xl px-1"
			>{section.sample.name}</label
		>
		<canvas bind:this={canvas} style:background-color={section.color} class="opacity-80 rounded-xl">
			<slot />
		</canvas>
	{:else}
		<canvas bind:this={canvas} class="">
			<slot />
		</canvas>
	{/if}
</div>
