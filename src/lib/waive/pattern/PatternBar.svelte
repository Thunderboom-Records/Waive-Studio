<script lang="ts">
	import { InstrumentType, type Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';
	import { BarData, convertDrumNotesToNoteEvents, convertMelodyNotesToNoteEvents } from '../audioEngine/barData';

	export let bar: Bar;
	export let instrument: Instrument;

	function addBar(){
		const arrangement = instrument.arrangement;

		let barNotes;
		if(
			instrument.type == InstrumentType.KICK || 
			instrument.type == InstrumentType.HIHAT || 
			instrument.type == InstrumentType.SNARE 
		){
			barNotes = convertDrumNotesToNoteEvents(bar.notes);
		} else {
			barNotes = convertMelodyNotesToNoteEvents(bar.notes, 24);
		}

		const barData = new BarData(barNotes);
		barData.z = bar.z;
		
		arrangement.add(barData);
	}
</script>

<div
	on:click={addBar}
	class="flex flex-row justify-between  place-items-start rounded-md w-11 h-28 
	bg-{instrument.color}-600 ">
</div>
