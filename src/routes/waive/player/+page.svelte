<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import PlayControls from '$lib/waive/playControls/PlayControls.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';

	let instruments: Instrument[] = [
		{ type: InstrumentType.KICK, color: { name: 'red', 500: '#d14132', 600: '#601c13' } },
		{ type: InstrumentType.SNARE, color: { name: 'blue', 500: '#3484d0', 600: '#273e60' } },
		{ type: InstrumentType.HIHAT, color: { name: 'purple', 500: '#9352c7', 600: '#632b8d' } },
		{ type: InstrumentType.BASS, color: { name: 'orange', 500: '#eb7130', 600: '#83371c' } },
		{ type: InstrumentType.LEAD, color: { name: 'green', 500: '#54ba84', 600: '#326e52' } }
	];
</script>

<div class="flex flex-col bg-gray-800 space-y-1 ">
	<div class="grid grid-cols-instrument-grid bg-gray-800 w-full gap-1">
		<!-- Row 1 -->
		<div class=" bg-gray-900 col-span-2">
			<PlayControls />
		</div>
		<div class="bg-gray-900 col-span-6">
			<FxControls />
		</div>

		<!-- Row 2 -->
		<InstrumentHeader />

		<!-- Row 3+ -->
		{#each instruments as instrument}
			<InstrumentRow {instrument} />
		{/each}
	</div>

	<div class="bg-gray-900 w-full h-4" />
</div>
