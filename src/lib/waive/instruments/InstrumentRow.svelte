<script lang="ts">
	import type { Instrument } from '$lib/types/waive';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBars from '../pattern/PatternBars.svelte';

	export let instrument: Instrument;
</script>

<!-- Col 1: S&M Controls -->
<SmToggles color={instrument.color} />

<!-- Col 2: Pattern Controls -->
<!-- <div class="bg-gray-900 min-w-96">
	<h2 class="text-{instrument.color}-600 text-center">pattern</h2>
</div> -->

<div class="flex flex-row w-full">
	<PatternControls {instrument} />
	<PatternBars {instrument} />
</div>

<!-- Col 3: Sample Controls -->
<div class="bg-gray-900 min-w-48">
	<h2 class="text-gray-500 text-center">sample</h2>
</div>

<!-- Col 4-7: Player Display -->
<PlayerSection />

<!-- Col 8: Download Button -->
<DownloadButton {instrument} />
