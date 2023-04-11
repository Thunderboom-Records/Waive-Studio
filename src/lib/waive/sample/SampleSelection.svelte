<script lang="ts">
	import type { Sample } from "$lib/types/waive";

	export let options: Sample[];
</script>

<select class="select w-60 rounded-full pl-4 text-start bg-gray-400 h-8">
	{#if options.length == 0}
	<option disabled selected>---</option>
	{/if}
	{#each options as option, i}
		{#if i == 0}
		<option selected>{option.name}</option>
		{:else}
		<option>{option.name}</option>
		{/if}
	{/each}
</select>
