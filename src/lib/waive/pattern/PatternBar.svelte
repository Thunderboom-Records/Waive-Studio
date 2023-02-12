<script lang="ts">
	import type { Bar } from '$lib/types/waive';

	export let bar: Bar;

	function remove() {
		bar.active != bar.active;
		bar = bar;
	}
</script>

{#if bar.active == true}
	<div
		class="flex flex-row justify-between  place-items-start rounded-md w-11 h-28 
		bg-{bar.instrument.color}-600 "
	>
		<p>{bar.index}</p>

		<button on:click={remove} class="w-2">x</button>
	</div>
{:else}
	<div class="rounded-md w-11 h-28 bg-gray-700 ">
		{bar.index}
	</div>
{/if}
