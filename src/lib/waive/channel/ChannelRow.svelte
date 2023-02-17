<script lang="ts">
	import type { ChannelStore } from '$lib/types/waive';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternCollection from '../pattern/PatternCollection.svelte';
	import SampleControls from '../sample/SampleControls.svelte';
	import { setContext } from 'svelte';

	export let channel: ChannelStore;
	setContext('channel', channel);

	$: console.log($channel.name);
</script>

<!-- Col 1: S&M Controls -->
<SmToggles />

<!-- Col 2: Pattern Controls -->
<div class="flex flex-row justify-evenly bg-gray-900">
	<PatternControls />
	<div class="flex flex-row place-items-center justify-center space-x-2">
		<PatternCollection />
	</div>
</div>

<!-- Col 3: Sample Controls -->
<div class="flex h-full flex-col justify-around space-y-1">
	<SampleControls />
</div>

<!-- Col 4-7: Player Display -->
<PlayerSection />

<!-- Col 8: Download Button -->
<DownloadButton />
