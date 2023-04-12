<script lang="ts">
	import { Transport } from 'tone';

	import { InstrumentType, type Instrument, type FX } from '$lib/types/waive';
	import Logo from '$lib/waive/transportControls/Logo.svelte';
	import HistoryButtons from '$lib/waive/transportControls/HistoryButtons.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';
	import InstrumentControls from '$lib/waive/instruments/InstrumentControls.svelte';
	import { Arrangement } from '$lib/waive/audioEngine/arrangement';
	import { makeBassCallback } from '$lib/waive/audioEngine/synths';
	import Timer from '$lib/waive/transportControls/Timer.svelte';
	import PlayButtons from '$lib/waive/transportControls/PlayButtons.svelte';
	import BpmRhythmControls from '$lib/waive/transportControls/BpmRhythmControls.svelte';
	import MasterVolume from '$lib/waive/transportControls/MasterVolume.svelte';

	import { masterFXChain, bassFXChain } from '$lib/waive/audioEngine/fxChains';

	const bassArrangement = new Arrangement();
	bassArrangement.synthCallback = makeBassCallback(bassFXChain[0].node);
	bassFXChain[bassFXChain.length - 1].node.toDestination();

	let instruments: Instrument[] = [
		{
			type: InstrumentType.DRUMS,
			color: 'red',
			apiPatternRequest: 'requestDrumPattern',
			apiInstrumentName: '00_KD',
			arrangement: new Arrangement(),
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
			arrangement: new Arrangement(),
		}
	];

	let selectedFX: FX[] = bassFXChain;

	Transport.loop = true;
	Transport.loopEnd = `4:0`;
</script>


<div class="flex flex-col bg-gray-800 space-y-1 w-full select-none">
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
		<InstrumentControls {selectedFX}/>
	</div>
</div>

