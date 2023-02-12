<script lang="ts">
	import SampleControls from './SampleControls.svelte';
	import SampleHeader from './SampleHeader.svelte';

	export let patterns: string[];
</script>

<section class="flex flex-col space-y-1 bg-gray-800 h-full">
	<SampleHeader />

	<div class="h-full space-y-1 flex flex-col justify-around">
		{#each patterns as pattern}
			<SampleControls {pattern} />
		{/each}
	</div>
</section>
