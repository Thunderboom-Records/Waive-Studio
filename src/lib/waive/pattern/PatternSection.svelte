<script lang="ts">
	import PatternBars from './PatternBars.svelte';
	import PatternControls from './PatternControls.svelte';
	import PatternHeader from './PatternHeader.svelte';
	import PatternSmToggles from './PatternSMToggles.svelte';

	export let patterns: string[];
</script>

<section class="flex flex-col space-y-1 bg-gray-800 h-full">
	<PatternHeader />

	{#each patterns as pattern}
		<div class="flex flex-row space-x-1">
			<PatternSmToggles />

			<div class="flex flex-row w-full">
				<PatternControls {pattern} />
				<PatternBars />
			</div>
		</div>
	{/each}
</section>
