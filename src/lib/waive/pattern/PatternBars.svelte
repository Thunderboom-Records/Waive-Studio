<script lang="ts">
	import type { Bar, Instrument } from '$lib/types/waive';
	import PatternBar from './PatternBar.svelte';

	export let instrument: Instrument;
	export let bars: Bar[] = [
		{ index: 0, active: false, instrument: instrument },
		{ index: 1, active: false, instrument: instrument },
		{ index: 2, active: false, instrument: instrument },
		{ index: 3, active: false, instrument: instrument },
		{ index: 4, active: false, instrument: instrument }
	];
</script>

<div class="flex flex-row justify-center place-items-center space-x-1">
	{#each bars as bar}
		<PatternBar {bar} />
	{/each}
</div>
