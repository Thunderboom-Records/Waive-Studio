<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';
	import PatternBar from './PatternBar.svelte';
	
	export let instrument: Instrument;
	export let bars: Bar[];
	export let selectedIndex: number | null;

	const dispatch = createEventDispatcher()

	function newBar(){
		dispatch("newBar");
	}
</script>

<div class="flex flex-row space-x-2 overflow-x-auto w-full h-full">
	{#each bars as bar, i}
		<PatternBar {bar} {instrument} {i} bind:selectedIndex={selectedIndex}/>
	{/each}
	<button
		class="flex flex-row justify-around items-center place-items-start rounded-md h-full bg-gray-600 cursor-pointer hover:bg-gray-500 min-w-pattern w-pattern"
		on:click={newBar}
	>
		<span class="text-3xl text-gray-800">+</span>
	</button>
	{#each {length: Math.max(0, 4 - bars.length)} as _, i}
	<div class="rounded-md h-full bg-gray-800 min-w-pattern w-pattern"/>	
	{/each}
</div>
