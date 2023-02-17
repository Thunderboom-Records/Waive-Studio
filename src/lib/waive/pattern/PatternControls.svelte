<script lang="ts">
	import { ChannelType, type ChannelStore } from '$lib/types/waive';
	import { getContext } from 'svelte';

	let channelStore: ChannelStore = getContext('channel');
	let channel = $channelStore;
	let patternStore = channel.patterns;

	function addPattern() {
		patternStore.add();
	}
</script>

<div class="flex flex-col place-items-start justify-evenly">
	<h3 class="text-{channel.color.name}-500 text-xl">
		{ChannelType[channel.type].toString().toLowerCase()}
	</h3>
	<button
		on:click={addPattern}
		class="bg-{channel.color.name}-500 hover:bg-{channel.color.name}-600 
				btn h-8 w-24 rounded-full text-xs">new pattern</button
	>
	<div class="flex flex-row place-items-center justify-center space-x-3">
		<button class="btn rounded-full bg-gray-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
		<p class="text-xs text-gray-400">complex</p>
	</div>
</div>
