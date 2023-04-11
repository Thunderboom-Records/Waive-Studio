<script lang="ts">
	import { InstrumentType, type Bar, type Instrument } from '$lib/types/waive';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBars from '../pattern/PatternBars.svelte';
	import SampleControls from '../sample/SampleControls.svelte';
	import { getRequest, ROOT_URL } from '$lib/scripts/utils';
	import {
		BarData,
		convertDrumNotesToNoteEvents,
		convertMelodyNotesToNoteEvents
	} from '../audioEngine/barData';

	export let instrument: Instrument;

	let bars: Bar[] = [];
	let selectedIndex: number | null = null;

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
			selectedIndex = bars.length - 1;
		});
	}

</script>

<!-- Col 1: S&M Controls -->
<SmToggles color={instrument.color} />

<!-- Col 2: Pattern Controls -->
<div class="grid grid-cols-4 bg-gray-900 py-2">
	<div class="col-span-1">
		<PatternControls on:newBar={requestPattern} {instrument}/>
	</div>
	<div class="col-span-3">
		<PatternBars on:newBar={requestPattern} bind:bars={bars} {instrument} bind:selectedIndex={selectedIndex}/>
	</div>
</div>

<!-- Col 3: Sample Controls -->
<div class="h-full space-y-1 flex flex-col justify-around">
	<SampleControls {instrument} />
</div>

<!-- Col 4-7: Player Display -->
<PlayerSection />

<!-- Col 8: Download Button -->
<DownloadButton {instrument} />
