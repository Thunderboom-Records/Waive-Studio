<script lang="ts">
	import type { Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';

	export let bar: Bar;
	export let instrument: Instrument;
	export let i: number;
	export let selectedIndex: number | null;
	
	function select(){
		selectedIndex = i;
		console.log(i)
	}

	function addBar() {
		const arrangement = instrument.arrangement;
		arrangement.add(bar.barData);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
	on:click={select}
	class="flex flex-row rounded-md w-11 h-28 bg-{instrument.color}-600 border-{instrument.color}-500 min-width-pattern {i === selectedIndex ? 'border-2 border-solid': 'border-none'}"
/>
