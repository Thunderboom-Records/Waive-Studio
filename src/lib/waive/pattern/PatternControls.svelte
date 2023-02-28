<script lang="ts">
	import { InstrumentType, type Bar, type Instrument } from '$lib/types/waive';
	import { getRequest, ROOT_URL } from '$lib/scripts/utils';
	import {
		BarData,
		convertDrumNotesToNoteEvents,
		convertMelodyNotesToNoteEvents
	} from '../audioEngine/barData';

	export let bars: Bar[];
	export let instrument: Instrument;

	function requestPattern() {
		getRequest(ROOT_URL, instrument.apiPatternRequest, {}).then((data) => {
			if (!data || !data.ok) {
				console.log('no pattern data');
				return;
			}

			let barNotes;
			if (
				instrument.type == InstrumentType.KICK ||
				instrument.type == InstrumentType.HIHAT ||
				instrument.type == InstrumentType.SNARE
			) {
				barNotes = convertDrumNotesToNoteEvents(data.notes);
			} else {
				barNotes = convertMelodyNotesToNoteEvents(data.notes, 24);
			}

			const barData = new BarData(barNotes);
			barData.z = data.z;

			let bar = {
				active: true,
				barData: barData
			};

			bars.push(bar);
			bars = bars;
		});
	}
</script>

<div class="flex flex-col justify-evenly place-items-start">
	<h3 class="text-{instrument.color}-500 text-xl">
		{InstrumentType[instrument.type].toLowerCase()}
	</h3>
	<button
		on:click={requestPattern}
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
