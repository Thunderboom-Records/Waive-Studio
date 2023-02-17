<script lang="ts">
	import SampleControls from './SampleControls.svelte';
	import SampleHeader from './SampleHeader.svelte';

	export let patterns: string[];
</script>

<section class="flex h-full flex-col space-y-1 bg-gray-800">
	<SampleHeader />

	<div class="flex h-full flex-col justify-around space-y-1">
		{#each patterns as pattern}
			<SampleControls {pattern} />
		{/each}
	</div>
</section>
