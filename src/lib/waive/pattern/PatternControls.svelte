<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	
	export let instrument: Instrument;
	export let selectedIndex: number;
	
	const dispatch = createEventDispatcher()

	$: variation = selectedIndex >= 0;
</script>

<div class="flex flex-col gap-2 p-2 mx-1 w-28 items-start justify-start">
	<h3 class="text-{instrument.color}-500 text-xl capitalize">
		{InstrumentType[instrument.type].toLowerCase()}
	</h3>
	<button
		on:click={() => dispatch("newClip", {variation: false})}
		class="bg-{instrument.color}-500 hover:bg-{instrument.color}-600 btn btn-sm rounded-full w-12 h-6 font-medium text-xs capitalize leading-10"
	>
		new
	</button>
	<button
		on:click={() => dispatch("newClip", {variation: true})}
		class="{variation ? `bg-${instrument.color}-500 hover:bg-${instrument.color}-600` : 'bg-gray-600'} font-medium leading-10 capitalize btn btn-sm rounded-full w-12 h-6 text-xs
		disabled:bg-gray-600/40 disabled:border-none border-none"
		disabled={!variation}
	>
		var
	</button>
</div>
