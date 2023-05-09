<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	
	export let instrument: Instrument;
	
	const dispatch = createEventDispatcher()

	function newBar(){
		dispatch("newBar");
	}

</script>

<div class="flex flex-col gap-2 p-2 mx-1 w-28 items-center">
	<h3 class="text-{instrument.color}-500 text-xl capitalize">
		{InstrumentType[instrument.type].toLowerCase()}
	</h3>
	<button
		on:click={newBar}
		class="bg-{instrument.color}-500 hover:bg-{instrument.color}-600 btn rounded-full w-12 h-6 text-xs"
	>
		new
	</button>
	<button
		on:click={newBar}
		class="bg-{instrument.color}-500 hover:bg-{instrument.color}-600 btn rounded-full w-12 h-6 text-xs"
	>
		var
	</button>
	<!-- <div class="flex flex-row space-x-1 justify-center place-items-center">
		<button class="btn rounded-full bg-gray-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
		<p class="text-xs text-gray-400">complexity</p>
	</div> -->
</div>
