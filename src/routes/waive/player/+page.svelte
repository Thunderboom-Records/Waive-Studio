<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import TransportControls from '$lib/waive/transportControls/TransportControls.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';
	import { Arrangement } from '$lib/waive/audioEngine/arrangement';
	import { bassCallback } from '$lib/waive/audioEngine/synths';

	const bassArrangement = new Arrangement();
	bassArrangement.synthCallback = bassCallback;

	let instruments: Instrument[] = [
		{
			type: InstrumentType.KICK,
			color: 'red',
			apiPatternRequest: 'requestDrumPattern',
			apiInstrumentName: '00_KD',
			arrangement: new Arrangement()
		},
		// { type: InstrumentType.SNARE, color: 'blue', apiPatternRequest: 'requestDrumPattern' },
		// { type: InstrumentType.HIHAT, color: 'purple', apiPatternRequest: 'requestDrumPattern' },
		{
			type: InstrumentType.BASS,
			color: 'orange',
			apiPatternRequest: 'requestBassline',
			apiInstrumentName: 'BASS',
			arrangement: bassArrangement,
		},
		{
			type: InstrumentType.LEAD,
			color: 'green',
			apiPatternRequest: 'requestMelody',
			apiInstrumentName: 'LEAD',
			arrangement: new Arrangement()
		}
	];
</script>

<div class="flex flex-col bg-gray-800 space-y-1 ">
	<div class="grid grid-cols-instrument-grid bg-gray-800 w-full gap-1">
		<!-- Row 1 -->
		<div class=" bg-gray-900 col-span-2">
			<TransportControls />
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
