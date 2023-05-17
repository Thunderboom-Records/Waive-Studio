<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	
	export let instrument: Instrument;
	export let selectedIndex: number;
	
	const dispatch = createEventDispatcher()

	$: variation = selectedIndex >= 0;

	function newClip(){
		dispatch("newClip", true);
	}

</script>

<div class="flex flex-col gap-2 p-2 mx-1 w-28 items-center">
	<h3 class="text-{instrument.color}-500 text-xl capitalize">
		{InstrumentType[instrument.type].toLowerCase()}
	</h3>
	<button
		on:click={newClip}
		class="bg-{instrument.color}-500 hover:bg-{instrument.color}-600 btn rounded-full w-12 h-6 text-xs"
	>
		new
	</button>
	<button
		on:click={newClip}
		class="{variation ? `bg-${instrument.color}-500 hover:bg-${instrument.color}-600` : 'bg-gray-600'} btn rounded-full w-12 h-6 text-xs"
		disabled={!variation}
	>
		var
	</button>
</div>
