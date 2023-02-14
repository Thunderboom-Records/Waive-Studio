<script lang="ts">
	import type { Bar, Instrument } from '$lib/types/waive';

	import { patterns } from '../stores/patternStore';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBar from '../pattern/PatternBar.svelte';
	import SampleControls from '../sample/SampleControls.svelte';

	export let instrument: Instrument;

	$: console.log($patterns);
</script>

<!-- Col 1: S&M Controls -->
<SmToggles color={instrument.color.name} />

<!-- Col 2: Pattern Controls -->
<div class="flex flex-row justify-evenly bg-gray-900">
	<PatternControls {instrument} />
	<div class="flex flex-row justify-center place-items-center space-x-2">
		<PatternBar {instrument} />
	</div>
</div>

<!-- Col 3: Sample Controls -->
<div class="h-full space-y-1 flex flex-col justify-around">
	<SampleControls />
</div>

<!-- Col 4-7: Player Display -->
<PlayerSection {instrument} />

<!-- Col 8: Download Button -->
<DownloadButton {instrument} />
