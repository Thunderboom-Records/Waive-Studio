<script lang="ts">
	import type { Instrument } from '$lib/types/waive';
	import PatternSection from './pattern/PatternSection.svelte';
	import SampleSection from './sample/SampleSection.svelte';

	export let selected: Instrument;

	$: instrument = selected;

	let color = 'blue-500';
</script>

<div class="bg-{color}">
	<h2 class="text-white text-xl">{instrument}</h2>
	<div>
		<PatternSection />
	</div>
	<div>
		<SampleSection />
	</div>
</div>
