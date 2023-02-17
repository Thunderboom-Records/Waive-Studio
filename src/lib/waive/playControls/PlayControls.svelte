<script lang="ts">
	import BpmRythmControls from './BpmRythmControls.svelte';
	import PlayButtons from './PlayButtons.svelte';
	import Timer from './Timer.svelte';

	import { Transport } from 'tone';

	Transport.loop = true;
	Transport.loopEnd = `4:0`;
</script>

<div class="flex flex-row justify-evenly items-center h-full space-x-8 w-full ">
	<!-- Timer -->
	<div class="self-center">
		<Timer />
	</div>

	<!-- Play & Stop Buttons -->
	<div class="flex flex-row">
		<PlayButtons />
	</div>

	<!-- BPM & Rythm -->
	<div class="text-white text-xs text-center space-y-1">
		<BpmRythmControls />
	</div>
</div>
