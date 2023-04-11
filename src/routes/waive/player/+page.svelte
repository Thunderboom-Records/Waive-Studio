<script lang="ts">
	import { Transport } from 'tone';
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import Logo from '$lib/waive/transportControls/Logo.svelte';
	import HistoryButtons from '$lib/waive/transportControls/HistoryButtons.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';
	import { Arrangement } from '$lib/waive/audioEngine/arrangement';
	import { bassCallback } from '$lib/waive/audioEngine/synths';
	import Timer from '$lib/waive/transportControls/Timer.svelte';
	import PlayButtons from '$lib/waive/transportControls/PlayButtons.svelte';
	import BpmRhythmControls from '$lib/waive/transportControls/BpmRhythmControls.svelte';
	import MasterVolume from '$lib/waive/transportControls/MasterVolume.svelte';

	const bassArrangement = new Arrangement();
	bassArrangement.synthCallback = bassCallback;

	let instruments: Instrument[] = [
		{
			type: InstrumentType.DRUMS,
			color: 'red',
			apiPatternRequest: 'requestDrumPattern',
			apiInstrumentName: '00_KD',
			arrangement: new Arrangement()
		},
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


	Transport.loop = true;
	Transport.loopEnd = `4:0`;
</script>


<div class="flex flex-col bg-gray-800 space-y-1 w-full">
	<div class="bg-gray-900 flex p-4 justify-between w-full text-white">
		<Logo />
		<HistoryButtons />
		<Timer />
		<PlayButtons />
		<BpmRhythmControls />
		<MasterVolume />
	</div>
	<div class="grid grid-cols-instrument-grid bg-gray-800 w-full gap-1">
		<InstrumentHeader />
		{#each instruments as instrument}
			<InstrumentRow {instrument} />
		{/each}
	</div>
	<div class="bg-gray-900">
		<FxControls />
	</div>
</div>

