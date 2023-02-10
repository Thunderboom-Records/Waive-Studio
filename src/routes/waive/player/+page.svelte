<script lang="ts">
	import { Instrument } from '$lib/types/waive';
	import MainControls from '$lib/waive/main-controls/MainControls.svelte';
	import MasterFxSection from '$lib/waive/master-fx/MasterFxSection.svelte';
	import PatternSection from '$lib/waive/pattern/PatternSection.svelte';
	import Player from '$lib/waive/player/Player.svelte';
	import SampleSection from '$lib/waive/sample/SampleSection.svelte';

	let patterns: string[] = ['kick', 'snare', 'hihat', 'bass', 'lead'];
</script>

<div class="flex flex-col bg-gray-800 space-y-1 ">
	<div class="flex flex-row space-x-1 w-full">
		<div class="w-3/12 min-w-fit bg-gray-900">
			<MainControls />
		</div>
		<div class="w-9/12 min-w-fit bg-gray-900">
			<MasterFxSection />
		</div>
	</div>

	<div class="flex flex-row space-x-1 w-full">
		<div class="w-3/12 min-w-fit bg-gray-900">
			<PatternSection {patterns} />
		</div>

		<div class="w-2/12 min-w-fit bg-gray-900">
			<SampleSection {patterns} />
		</div>

		<div class="w-7/12 min-w-fit bg-gray-900">
			<Player />
		</div>
	</div>

	<div class="bg-gray-900 w-full h-4" />
</div>
