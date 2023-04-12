<script lang="ts">
	import { NodeType } from '$lib/types/waive';
	import SampleControls from '../sample/SampleControls.svelte';
	import FxDelay from './FX_Delay.svelte';
	import FxEq3 from './FX_EQ3.svelte';
	import FxFilter from './FX_Filter.svelte';
	import FxGain from './FX_Gain.svelte';
	import FxLimiter from './FX_Limiter.svelte';
	import FxReverb from './FX_Reverb.svelte';

	export let fxChain: NodeType[];
</script>

<section class="flex flex-col w-full p-2">
	<!-- <div>
		<h2 class="text-gray-400 text-center">master fx</h2>
	</div> -->
	<div class="flex flex-row">
		{#each fxChain as fx}
			{#if fx == NodeType.SAMPLER}
				<!-- <SampleControls instrument={null} /> -->
				<div>SAMPLER</div>
			{:else if fx == NodeType.EQ3}
				<FxEq3/>
			{:else if fx == NodeType.FILTER}
				<FxFilter/>
			{:else if fx == NodeType.GAIN}
				<FxGain/>
			{:else if fx == NodeType.LIMITER}
				<FxLimiter/>
			{:else if fx == NodeType.DELAY}
				<FxDelay/>
			{:else if fx == NodeType.REVERB}
				<FxReverb/>
			{/if}
		{/each}
	</div>
</section>
