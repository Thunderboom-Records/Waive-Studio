<script lang="ts">
	import type { Bar, Instrument } from '$lib/types/waive';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBars from '../pattern/PatternBars.svelte';
	import SampleControls from '../sample/SampleControls.svelte';

	export let instrument: Instrument;

	let bars: Bar[] = [
		{ index: 0, active: true, instrument: instrument },
		{ index: 1, active: true, instrument: instrument },
		{ index: 2, active: false, instrument: instrument },
		{ index: 3, active: false, instrument: instrument },
		{ index: 4, active: false, instrument: instrument }
	];
</script>

<!-- Col 1: S&M Controls -->
<SmToggles color={instrument.color} />

<!-- Col 2: Pattern Controls -->
<div class="flex flex-row justify-evenly bg-gray-900">
	<PatternControls {bars} />
	<PatternBars {bars} />
</div>

<!-- Col 3: Sample Controls -->
<div class="h-full space-y-1 flex flex-col justify-around">
	<SampleControls />
</div>

<!-- Col 4-7: Player Display -->
<PlayerSection />

<!-- Col 8: Download Button -->
<DownloadButton {instrument} />
