<script lang="ts">
	import type { Bar } from '$lib/types/waive';
	import type { Instrument } from '$lib/types/waive';
	import PatternBar from './PatternBar.svelte';
	
	export let instrument: Instrument;
	export let bars: Bar[];
</script>

<div class="flex flex-row justify-center place-items-center space-x-2">
	{#each bars as bar}
		<PatternBar {bar} {instrument}/>
	{/each}
</div>
