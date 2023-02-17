<script lang="ts">
	import BpmRythmControls from './BpmRythmControls.svelte';
	import PlayButtons from './PlayButtons.svelte';
	import Timer from './Timer.svelte';

	export let elapsedTime: number = 0;
</script>

<div class="flex h-full w-full flex-row items-center justify-evenly space-x-8 ">
	<!-- Timer -->
	<div class="self-center">
		<Timer {elapsedTime} />
	</div>

	<!-- Play & Stop Buttons -->
	<div class="flex flex-row">
		<PlayButtons bind:elapsedTime />
	</div>

	<!-- BPM & Rythm -->
	<div class="space-y-1 text-center text-xs text-white">
		<BpmRythmControls />
	</div>
</div>
