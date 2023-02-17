<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import PlayControls from '$lib/waive/playControls/PlayControls.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';

	// import * as Tone from 'tone';

	let instruments: Instrument[] = [
		{ type: InstrumentType.KICK, color: 'red' },
		{ type: InstrumentType.SNARE, color: 'blue' },
		{ type: InstrumentType.HIHAT, color: 'purple' },
		{ type: InstrumentType.BASS, color: 'orange' },
		{ type: InstrumentType.LEAD, color: 'green' }
	];

	//let sampler: Tone.ToneAudioBuffer = new Tone.ToneAudioBuffer();

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
