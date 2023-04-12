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

<div class="flex flex-row space-x-2 overflow-x-auto w-full">
	{#each bars as bar, i}
		<PatternBar {bar} {instrument} {i} bind:selectedIndex={selectedIndex}/>
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div 
		class="flex flex-row justify-around items-center place-items-start rounded-md w-11 h-28 bg-gray-600 cursor-pointer hover:bg-gray-500 min-width-pattern"
		on:click={newBar}
	>
		<span class="text-3xl text-gray-800">+</span>
	</div>
	{#each {length: 4 - bars.length} as _, i}
		<div class="rounded-md w-11 h-28 bg-gray-800 min-width-pattern"/>
	{/each}
	
</div>
