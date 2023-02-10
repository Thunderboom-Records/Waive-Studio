<script lang="ts">
	import PlayButtons from './PlayButtons.svelte';
	import Timer from './Timer.svelte';

	export let elapsedTime: number = 0;

	let bpm = 120;
	let rythm = {
		base: 4,
		over: 4
	};
</script>

<div class="flex flex-row justify-evenly items-center h-full space-x-8 w-full">
	<!-- Timer -->
	<div class="self-center">
		<Timer {elapsedTime} />
	</div>

	<!-- Play & Stop Buttons -->
	<div class="flex flex-row">
		<PlayButtons bind:elapsedTime />
	</div>

	<!-- BPM & Rythm -->
	<div class="text-white text-xs text-center space-y-1">
		<!-- BPM -->
		<div class="flex flex-row space-x-1 items-center">
			<span class="badge rounded-l-full bg-gray-800 h-6 w-24">{bpm} bpm</span>

			<div class="bg-gray-800 rounded-r-full h-6 w-12">
				<button class="btn btn-sm"> - </button>
				<button class="btn btn-sm"> + </button>
			</div>
		</div>

		<!-- Rythm -->
		<div class="flex flex-row space-x-1 items-center">
			<span class="badge rounded-l-full bg-gray-800 h-6 w-24">{rythm.base}/{rythm.over}</span>

			<div class="bg-gray-800 rounded-r-full h-6 w-12">
				<button class="btn-sm"> - </button>
				<button class="btn-sm"> + </button>
			</div>
		</div>
	</div>
</div>
