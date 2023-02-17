<script lang="ts">
	import type { ChannelStore } from '$lib/types/waive';
	import { getContext } from 'svelte';
	import type { PatternStore } from '../stores/patterns';

	const channelStore: ChannelStore = getContext('channel');
	let channel = $channelStore;
	const patternStore: PatternStore = channel.patterns;
	let patterns = $patternStore;

	let placeholderCount = 5;
	let placeholders: number[];

	$: {
		placeholderCount = 5 - patterns.length;
		let list = [];

		for (let i = 0; i < placeholderCount; i++) {
			list.push(0);
		}

		placeholders = list;

		console.log(patterns);
	}

	// h-28 7rem 112px, w-11 2,75rem 44px
</script>

{#each patterns as pattern}
	<div class="relative h-28 w-11 rounded-md bg-{channel.color.name}-600" />
{/each}
{#if placeholderCount > 0 && placeholderCount != 0}
	{#each placeholders as placeholder}
		<div class="h-28 w-11 rounded-md bg-gray-700 " />
	{/each}
{/if}
