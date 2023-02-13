<script lang="ts">
	import type { PlayerCanvas, Rectangle } from '$lib/types/waive';
	import { onMount } from 'svelte';

	// Allow parent to explicitly set height and width
	export let section: PlayerCanvas;

	// export let width: number;
	// export let height: number;
	// export let color: string = '#d14132';

	let canvas: HTMLCanvasElement;

	// Need to setup the canvas and the context in the onMount
	onMount(() => {
		let ctx = canvas.getContext('2d');

		canvas.width = section.canvas.w;
		canvas.height = section.canvas.h;

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
	});

	// Use seperate helper functions to draw the shapes we need
	function drawRect(ctx: CanvasRenderingContext2D, rect: Rectangle, fill: string) {
		ctx.fillStyle = fill;
		ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
	}
</script>

<div>
	<canvas bind:this={canvas} class="bg-red-600/60 rounded-xl">
		<slot />
	</canvas>
</div>
