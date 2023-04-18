<script lang="ts">
	import { afterUpdate } from "svelte";
	import type { Sampler } from "$lib/waive/audioEngine/sampler";

	export let sampler: Sampler;
	
	function selectSample(){
		sampler.addSample(sampler.current);
	}

	afterUpdate(() => selectSample());

</script>

<select bind:value={sampler.current} on:change={selectSample} class="select w-60 rounded-full pl-4 text-start bg-gray-400 h-8">
	{#if sampler.options.length == 0}
	<option disabled selected>---</option>
	{/if}
	{#each sampler.options as option}
		<option value={option}>{option.name}</option>
	{/each}
</select>
