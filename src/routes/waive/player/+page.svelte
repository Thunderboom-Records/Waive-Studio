<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import PlayControls from '$lib/waive/playControls/PlayControls.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import PatternSection from '$lib/waive/pattern/PatternSection.svelte';
	import SampleSection from '$lib/waive/sample/SampleSection.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';

	let instruments: Instrument[] = [
		{ type: InstrumentType.KICK, color: 'red' },
		{ type: InstrumentType.SNARE, color: 'blue' },
		{ type: InstrumentType.HIHAT, color: 'purple' },
		{ type: InstrumentType.BASS, color: 'orange' },
		{ type: InstrumentType.LEAD, color: 'green' }
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

	<!-- <div class="flex flex-row space-x-1 w-full">
		<div class="w-3/12 min-w-fit bg-gray-900">
			<PatternSection {patterns} />
		</div>

		<div class="w-2/12 min-w-fit bg-gray-900">
			<SampleSection {patterns} />
		</div>


		<div class="w-7/12 min-w-fit bg-gray-900">
			<Player />
		</div>
	</div> -->

	<div class="bg-gray-900 w-full h-4" />
</div>
