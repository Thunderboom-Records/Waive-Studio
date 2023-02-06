<script lang="ts">
	import PlayButton from './PlayButton.svelte';
	import Timer from './Timer.svelte';

	export let elapsedTime: number = 0;

	let bpm = 120;
	let rythm = {
		base: 4,
		over: 4
	};
</script>

<div class="flex flex-row justify-evenly items-center py-4">
	<!-- Timer -->
	<Timer {elapsedTime} />

	<!-- Play & Record Buttons -->
	<div>
		<!-- Play Button -->
		<PlayButton bind:elapsedTime />

		<!-- Record Button -->
		<button class="btn btn-circle text-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
	</div>

	<!-- BPM & Rythm -->
	<div class="text-white text-xs text-center space-y-2">
		<!-- BPM -->
		<div class="flex flex-row space-x-1">
			<span class="badge rounded-l-full flex-grow bg-gray-800 py-1 px-4">{bpm}bpm</span>

			<div class="bg-gray-800 rounded-r-full py-1 px-4">
				<button class="btn btn-xs "> - </button>
				<button class="btn btn-xs"> + </button>
			</div>
		</div>

		<!-- Rythm -->
		<div class="flex flex-row space-x-1">
			<span class="badge rounded-l-full flex-grow bg-gray-800 py-1 px-4"
				>{rythm.base}/{rythm.over}</span
			>

			<div class="bg-gray-800 rounded-r-full py-1 px-4">
				<button class="btn btn-xs "> - </button>
				<button class="btn btn-xs"> + </button>
			</div>
		</div>
	</div>
</div>
