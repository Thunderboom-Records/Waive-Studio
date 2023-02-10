<script lang="ts">
	import { InstrumentType, type Instrument } from '$lib/types/waive';
	import { onMount } from 'svelte';
	import PlayerSection from '../player/PlayerSection.svelte';

	export let instrument: Instrument;
	let color: string;

	onMount(() => {
		setColor();
	});

	function setColor() {
		switch (instrument.type) {
			case InstrumentType.KICK:
				color = 'red';
				break;
			case InstrumentType.SNARE:
				color = 'blue';
				break;
			case InstrumentType.HIHAT:
				color = 'purple';
				break;
			case InstrumentType.BASS:
				color = 'orange';
				break;
			case InstrumentType.LEAD:
				color = 'green';
				break;
		}
	}
</script>

<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<div class="bg-gray-900 w-48" />
<!-- Col 1: Placeholder -->
<div class="bg-gray-900 min-w-16" />

<!-- Col 2: PatternHeader -->
<div class="bg-gray-900 min-w-96">
	<h2 class="text-{color}-500 text-center">pattern</h2>
</div>

<!-- Col 3: SampleHeader-->
<div class="bg-gray-900 min-w-48">
	<h2 class="text-gray-300 text-center">sample</h2>
</div>

<!-- Col 4-7: PlayerHeader -->
<PlayerSection />

<!-- Col 8: Placeholder-->
<div class="bg-gray-900 min-w-16" />
