<script lang="ts">
	import type { Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';

	export let bar: Bar;
	export let instrument: Instrument;
</script>

{#if bar.active == true}
	<div
		class="flex flex-row justify-between  place-items-start rounded-md w-11 h-28 
		bg-{instrument.color}-600 ">

	</div>
{:else}
	<div class="rounded-md w-11 h-28 bg-gray-700 ">
	</div>
{/if}
