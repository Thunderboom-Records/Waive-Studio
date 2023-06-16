<script lang="ts">
	import * as Tone from 'tone';

	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import Logo from '$lib/waive/transportControls/Logo.svelte';
	import HistoryButtons from '$lib/waive/transportControls/HistoryButtons.svelte';
	import InstrumentRow from '$lib/waive/instruments/InstrumentRow.svelte';
	import InstrumentHeader from '$lib/waive/instruments/InstrumentHeader.svelte';
	import InstrumentControls from '$lib/waive/instruments/InstrumentControls.svelte';
	import { Arrangement } from '$lib/waive/audioEngine/arrangement';
	import { makeMelodyCallback, makeDrumsCallback } from '$lib/waive/audioEngine/synths';
	import ChainSelect from '$lib/waive/instruments/ChainSelect.svelte';
	import Timer from '$lib/waive/transportControls/Timer.svelte';
	import PlayButtons from '$lib/waive/transportControls/PlayButtons.svelte';
	import BpmRhythmControls from '$lib/waive/transportControls/BpmRhythmControls.svelte';
	import MasterVolume from '$lib/waive/transportControls/MasterVolume.svelte';

	import { FXChains, SMNodes } from '$lib/waive/audioEngine/fxChains';
	import { arrangements, loopLength } from '$lib/waive/stores/stores';
	import { writable } from 'svelte/store';
	import Playhead from '$lib/waive/player/Playhead.svelte';
	import { convertDrumNotesToNoteEvents, convertMelodyNotesToNoteEvents } from '$lib/waive/audioEngine/barData';
	import { getChainSource } from '$lib/scripts/utils';

	const drumArrangement = new Arrangement(convertDrumNotesToNoteEvents);
	drumArrangement.synthCallback = makeDrumsCallback(FXChains)
	arrangements[InstrumentType.DRUMS] = writable(drumArrangement);

	const bassArrangement = new Arrangement(convertMelodyNotesToNoteEvents);
	if(typeof FXChains[InstrumentType.BASS] !== 'undefined'){
		bassArrangement.synthCallback = makeMelodyCallback(getChainSource(FXChains[InstrumentType.BASS]), 24);
	}
	arrangements[InstrumentType.BASS] = writable(bassArrangement);

	const leadArrangement = new Arrangement(convertMelodyNotesToNoteEvents);
	if(typeof FXChains[InstrumentType.LEAD] !== 'undefined'){
		leadArrangement.synthCallback = makeMelodyCallback(getChainSource(FXChains[InstrumentType.LEAD]));
	}
	arrangements[InstrumentType.LEAD] = writable(leadArrangement);

	let instruments: Instrument[] = [
		{
			type: InstrumentType.DRUMS,
			color: 'red',
			apiPatternRequest: 'requestDrumPattern',
			arrangement: drumArrangement,
		},
		{
			type: InstrumentType.BASS,
			color: 'orange',
			apiPatternRequest: 'requestBassline',
			arrangement: bassArrangement,
		},
		{
			type: InstrumentType.LEAD,
			color: 'green',
			apiPatternRequest: 'requestMelody',
			arrangement: leadArrangement,
		}
	];

	Tone.Transport.loop = true;
	loopLength.subscribe(value => Tone.Transport.loopEnd = value);

</script>


<div class="flex flex-col bg-gray-800 space-y-1 w-full h-full select-none overflow-hidden">
	<div class="bg-gray-900 flex justify-between p-4 max-h-fit w-full text-white h-16">
		<Logo />
		<HistoryButtons />
		<ChainSelect key={InstrumentType.MASTER}>Master FX</ChainSelect>
		<Timer />
		<PlayButtons />
		<BpmRhythmControls />
		<MasterVolume />
	</div>
	<div class="grid grid-cols-instrument-grid bg-gray-800 w-full gap-1">
		<InstrumentHeader />
		<Playhead />
		{#each instruments as instrument, row}
			<InstrumentRow {instrument} row={row+2} channelNode={SMNodes[instrument.type]}/>
		{/each}
	</div>
	<div class="bg-gray-900 w-full max-h-fit">
		<InstrumentControls />
	</div>
</div>