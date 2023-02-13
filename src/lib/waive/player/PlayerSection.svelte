<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { PlayerCanvas } from '$lib/types/waive';

	let width: number = 235;
	let height: number = 100;

	let sections: PlayerCanvas[] = [
		{ canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' },
		{ canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' },
		{ canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' },
		{ canvas: { w: width, h: height }, canvasColor: '', fillColor: '#d14132' }
	];
</script>

{#each sections as section}
	<div class="bg-gray-900 flex flex-row justify-center place-items-center">
		<Canvas {section} />
	</div>
{/each}
