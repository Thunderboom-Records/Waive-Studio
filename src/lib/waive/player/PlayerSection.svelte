<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import type { Instrument } from '$lib/types/waive';
	import { getContext } from 'svelte';
	import { samples } from '../stores/sampleStore';

	const { getInstrument } = getContext('instrument');
	const instrument: Instrument = getInstrument();

	let width: number = 235;
	let height: number = 100;

	$: sections = [
		{
			canvas: { w: width, h: height },
			color: instrument.color[600],
			fill: instrument.color[500],
			sample: $samples[0]
		},
		{
			canvas: { w: width, h: height },
			color: instrument.color[600],
			fill: instrument.color[500],
			sample: $samples[1]
		},
		{
			canvas: { w: width, h: height },
			color: instrument.color[600],
			fill: instrument.color[500],
			sample: $samples[2]
		},
		{
			canvas: { w: width, h: height },
			color: instrument.color[600],
			fill: instrument.color[500],
			sample: $samples[3]
		}
	];

	$: console.log($samples);
</script>

{#each sections as section}
	<div class="bg-gray-900 flex flex-row justify-center place-items-center">
		<Canvas {section} />
	</div>
{/each}
