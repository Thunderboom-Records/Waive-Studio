<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { Instrument, PlayerCanvas } from '$lib/types/waive';
	import { arrangements } from '../stores/stores';

	let width: number = 235;
	let height: number = 100;

	export let instrument: Instrument;
	export let row: number;

	let section: PlayerCanvas = { canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' };

	let arrangementStore = arrangements[instrument.type];
</script>

{#each instrument.arrangement.arrangement as _, i}
	<div class="col-start-{i + 4} row-start-{row} bg-gray-900 flex flex-row justify-center place-items-center">
		<Canvas {section} bind:instrument={instrument} {i} bind:arrangementStore={arrangementStore} on:addBar on:removeBar />
	</div>
{/each}

<style>
	/* Adding these since tailwind is having some issues it seems... */
	.col-start-4 {
		grid-column-start: 4;
	}
	.col-start-5 {
		grid-column-start: 5;
	}
	.col-start-6 {
		grid-column-start: 6;
	}
	.col-start-7 {
		grid-column-start: 7;
	}
	.row-start-2 {
		grid-row-start: 2;
	}
	.row-start-3 {
		grid-row-start: 3;
	}
	.row-start-4 {
		grid-row-start: 4;
	}
	.row-start-5 {
		grid-row-start: 5;
	}
</style>