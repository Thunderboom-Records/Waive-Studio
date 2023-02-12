<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';

	export let instrument: Instrument;
</script>

<div class="flex flex-col justify-evenly place-items-start">
	<h3 class="text-{instrument.color}-500 text-xl">
		{InstrumentType[instrument.type].toLowerCase()}
	</h3>
	<button
		class="bg-{instrument.color}-500 hover:bg-{instrument.color}-600 
				btn rounded-full w-24 h-8 text-xs">new pattern</button
	>
	<div class="flex flex-row space-x-3 justify-center place-items-center">
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
		<p class="text-xs text-gray-400">complex</p>
	</div>
</div>
