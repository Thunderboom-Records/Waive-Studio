<script lang="ts">
	import type { Instrument } from '$lib/types/waive';

	export let instrument: Instrument;
	export let i: number;
	export let selectedIndex: number | null;
	
	function select(){
		selectedIndex = i;
	}

	function dragStart(event: any){
		select();
		let data = {
			index: i, 
			type: instrument.type
		}
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

</script>

<!-- TODO: why border color only works sometimes?? -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
	on:click={select}
	class="flex flex-row rounded-md w-11 h-28 bg-{instrument.color}-600 border-{instrument.color}-500 min-w-pattern border-2 {i === selectedIndex ? 'border-solid': 'border-none'}"
	draggable="true"
	on:dragstart={dragStart}
/>
