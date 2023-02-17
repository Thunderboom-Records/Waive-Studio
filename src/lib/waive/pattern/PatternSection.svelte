<script lang="ts">
	import PatternBars from './PatternBars.svelte';
	import PatternControls from './PatternControls.svelte';
	import PatternHeader from './PatternHeader.svelte';
	import SmToggles from './SmControls.svelte';

	export let patterns: string[];
</script>

<section class="flex h-full flex-col space-y-1 bg-gray-800">
	<PatternHeader />

	{#each patterns as pattern}
		<div class="flex flex-row space-x-1">
			<SmToggles />

			<div class="flex w-full flex-row">
				<PatternControls {pattern} />
				<PatternBars />
			</div>
		</div>
	{/each}
</section>
