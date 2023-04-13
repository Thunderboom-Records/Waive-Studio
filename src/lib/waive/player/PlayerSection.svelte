<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { Instrument, PlayerCanvas } from '$lib/types/waive';

	let width: number = 235;
	let height: number = 100;

	export let instrument: Instrument;

	let section: PlayerCanvas = { canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' };
</script>

{#each instrument.arrangement.arrangement as barData, i}
	<div class="col-start-{i + 4} bg-gray-900 flex flex-row justify-center place-items-center">
		<Canvas {section} bind:instrument={instrument} {i} on:addBar />
	</div>
{/each}
