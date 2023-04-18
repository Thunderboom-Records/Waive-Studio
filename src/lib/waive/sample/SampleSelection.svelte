<script lang="ts">
	import { afterUpdate } from "svelte";
	import type { Sampler } from "$lib/waive/audioEngine/sampler";
	import { sampleOptions } from "../stores/stores";
	import type { DrumType, InstrumentType, Sample } from "$lib/types/waive";

	export let sampler: Sampler;
	export let sampleOptionsKey: InstrumentType | DrumType;

	let options: Sample[] = []

	sampleOptions[sampleOptionsKey]?.subscribe(value => options = value);
	
	function selectSample(){
		sampler.selectSample(sampler.current);
	}

	afterUpdate(() => selectSample());

</script>

<select bind:value={sampler.current} on:change={selectSample} class="select w-60 rounded-full pl-4 text-start bg-gray-400 h-8">
	{#if options.length == 0}
	<option disabled selected value={undefined}>---</option>
	{/if}
	{#each options as option}
		<option value={option}>{option.name}</option>
	{/each}
</select>
