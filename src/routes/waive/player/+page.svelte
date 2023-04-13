<script lang="ts">
	import { Transport } from 'tone';

	import { InstrumentType, type Instrument, type FX, DrumType } from '$lib/types/waive';
	import Logo from '$lib/waive/transportControls/Logo.svelte';
	import HistoryButtons from '$lib/waive/transportControls/HistoryButtons.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';
	import InstrumentControls from '$lib/waive/instruments/InstrumentControls.svelte';
	import { Arrangement } from '$lib/waive/audioEngine/arrangement';
	import { makeBassCallback } from '$lib/waive/audioEngine/synths';
	import ChainSelect from '$lib/waive/instruments/ChainSelect.svelte';
	import Timer from '$lib/waive/transportControls/Timer.svelte';
	import PlayButtons from '$lib/waive/transportControls/PlayButtons.svelte';
	import BpmRhythmControls from '$lib/waive/transportControls/BpmRhythmControls.svelte';
	import MasterVolume from '$lib/waive/transportControls/MasterVolume.svelte';

	import { FXChains } from '$lib/waive/audioEngine/fxChains';

	const bassArrangement = new Arrangement();
	if(typeof(FXChains[InstrumentType.BASS]) != 'undefined'){
		bassArrangement.synthCallback = makeBassCallback(FXChains[InstrumentType.BASS][0].node);
	}

	let selectedFX: FX[] | undefined;
	let selectedChain: InstrumentType | DrumType;

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

	function selectChain(event: any){
		selectedChain = event.detail.key;
		if(typeof(FXChains[selectedChain]) !== 'undefined'){
			selectedFX = FXChains[selectedChain];
		}
	}

	selectChain({detail: {key: InstrumentType.MASTER}})

	Transport.loop = true;
	Transport.loopEnd = `4:0`;
</script>


<div class="flex flex-col bg-gray-800 space-y-1 w-full select-none">
	<div class="bg-gray-900 flex p-4 justify-between items-center w-full text-white">
		<Logo />
		<HistoryButtons />
		<ChainSelect key={InstrumentType.MASTER} on:switch={selectChain}>Master FX</ChainSelect>
		<Timer />
		<PlayButtons />
		<BpmRhythmControls />
		<MasterVolume />
	</div>
	<div class="grid grid-cols-instrument-grid bg-gray-800 w-full gap-1">
		<InstrumentHeader />
		{#each instruments as instrument}
			<InstrumentRow {instrument} on:switch={selectChain} />
		{/each}
	</div>
	<div class="bg-gray-900">
		<InstrumentControls {selectedFX} bind:selectedChain={selectedChain}/>
	</div>
</div>

