<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { Instrument } from '$lib/types/waive';
	import { arrangements } from '../stores/stores';

	export let instrument: Instrument;
	export let row: number;

	let arrangementStore = arrangements[instrument.type];
</script>

{#each instrument.arrangement.arrangement as _, i}
	<div class="col-start-{i + 3} row-start-{row} flex flex-row justify-center place-items-center">
		<Canvas bind:instrument={instrument} {i} bind:arrangementStore={arrangementStore} on:addBar on:removeBar on:newClip />
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