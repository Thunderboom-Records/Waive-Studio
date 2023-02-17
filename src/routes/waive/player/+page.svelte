<script lang="ts">
	import PlayControls from '$lib/waive/playControls/PlayControls.svelte';
	import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import ChannelRow from '$lib/waive/channel/ChannelRow.svelte';
	import ChannelHeader from '$lib/waive/channel/ChannelHeader.svelte';
	import { master, kick, snare, hihat, bass, lead } from '$lib/waive/stores/channel';
</script>

<div class="flex flex-col space-y-1 bg-gray-800 ">
	<div class="grid w-full grid-cols-instrument-grid gap-1 bg-gray-800">
		<!-- Row 1 -->
		<div class=" col-span-2 bg-gray-900">
			<PlayControls />
		</div>
		<div class="col-span-6 bg-gray-900">
			<FxControls />
		</div>

		<!-- Row 2 -->
		<ChannelHeader />

		<!-- Row 3+ -->
		<ChannelRow channel={kick} />
		<ChannelRow channel={snare} />
		<ChannelRow channel={hihat} />
		<ChannelRow channel={bass} />
		<ChannelRow channel={lead} />
	</div>

	<div class="h-4 w-full bg-gray-900" />
</div>
