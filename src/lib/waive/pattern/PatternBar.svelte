<script lang="ts">
	import type { Instrument, Pattern } from '$lib/types/waive';
	import { getContext } from 'svelte';
	import { patterns } from '../stores/patternStore';

	const { getInstrument } = getContext('instrument');
	const instrument: Instrument = getInstrument();

	function remove(pattern: Pattern) {
		patterns.remove(pattern);
	}
</script>

{#each $patterns as pattern}
	{#if pattern.active}
		<div class="relative rounded-md w-11 h-28 bg-{instrument.color.name}-600">
			<button on:click={() => remove(pattern)} class="w-2 absolute right-1 top-0">x</button>
		</div>
	{:else}
		<div class="rounded-md w-11 h-28 bg-gray-700 " />
	{/if}
{/each}
