<script lang="ts">
	import type { Channel, ChannelStore } from '$lib/types/waive';
	import { getContext } from 'svelte';
	import SmToggle from './SmToggle.svelte';

	const channelStore: ChannelStore = getContext('channel');
	let channel: Channel = $channelStore;
</script>

<div class="w-full space-y-1 bg-gray-800 text-sm text-gray-500">
	<SmToggle color={channel.color.name}>S</SmToggle>
	<SmToggle color={channel.color.name}>M</SmToggle>
</div>
