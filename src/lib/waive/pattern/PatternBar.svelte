<script lang="ts">
	import type { Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';

	export let bar: Bar;
	export let instrument: Instrument;

	function addBar() {
		const arrangement = instrument.arrangement;

		arrangement.add(bar.barData);
	}
</script>

<div
	on:click={addBar}
	class="flex flex-row justify-between  place-items-start rounded-md w-11 h-28 
	bg-{instrument.color}-600 "
/>
