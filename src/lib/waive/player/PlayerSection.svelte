<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { Channel, ChannelStore } from '$lib/types/waive';
	import { getContext } from 'svelte';
	import { samples } from '../stores/sample';

	const channelStore: ChannelStore = getContext('channel');
	let channel = $channelStore;

	let width: number = 235;
	let height: number = 100;

	$: sections = [
		{
			canvas: { w: width, h: height },
			color: channel.color[600],
			fill: channel.color[500],
			sample: $samples[0]
		},
		{
			canvas: { w: width, h: height },
			color: channel.color[600],
			fill: channel.color[500],
			sample: $samples[1]
		},
		{
			canvas: { w: width, h: height },
			color: channel.color[600],
			fill: channel.color[500],
			sample: $samples[2]
		},
		{
			canvas: { w: width, h: height },
			color: channel.color[600],
			fill: channel.color[500],
			sample: $samples[3]
		}
	];
</script>

{#each sections as section}
	<div class="flex flex-row place-items-center justify-center bg-gray-900">
		<Canvas {section} />
	</div>
{/each}
