<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Sample } from "$lib/types/waive";

	export let current: Sample | undefined;
	export let options: Sample[] | undefined;

	const dispatch = createEventDispatcher();

	function selectSample(){
		dispatch("selection", current);
	}

</script>

<select bind:value={current} on:change={selectSample} class="select select-sm max-w-[20rem] rounded-full pl-4 text-start bg-gray-500 h-8">
	{#if typeof options === 'undefined' || options.length == 0}
	<option disabled selected value={undefined}>---</option>
	{:else}
		{#each options as option}
			<option value={option}>{option.name}</option>
		{/each}
	{/if}
</select>
