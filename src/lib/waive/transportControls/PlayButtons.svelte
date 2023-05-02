<script lang="ts">
	import * as Tone from 'tone';
	import { splitTimeString } from '$lib/scripts/utils';
	import { record } from '../audioEngine/record';
	import { recording } from '../stores/stores';

	enum PlayingState {
		PLAYING,
		STOPPED,
		STOPPING
	}

	let state: PlayingState = PlayingState.STOPPED;
	let stopEvent: Tone.ToneEvent = new Tone.ToneEvent();

	const start = () => {
		Tone.start();  // TODO: put in splash page?
		
		stopEvent.dispose();
		Tone.Transport.start();
		state = PlayingState.PLAYING;
	};

	const stop = () => {
		const currentPosition = splitTimeString(Tone.Transport.position.toString());
		const currentLoopEnd = splitTimeString(Tone.Time(Tone.Transport.loopEnd).toBarsBeatsSixteenths());
		let stopTime = currentPosition.bar + 1;

		if(stopTime >= currentLoopEnd.bar){
			stopTime = 0;
		}

		stopEvent = new Tone.ToneEvent(() => {
			Tone.Transport.stop();
			Tone.Transport.position = "0:0:0";
			state = PlayingState.STOPPED;
			stopEvent.dispose();
		});
		stopEvent.start({"1m": stopTime, "64n": 1});
		state = PlayingState.STOPPING;
	};

	function startRecord() {
		recording.set(true);
		record();
	};
</script>

<div class="flex flex-row space-x-2 items-center">
	{#if state === PlayingState.STOPPED}
		<button on:click={start} class="btn btn-circle text-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-8 h-8"
			>
			<!-- Play Button -->
				<path
					fill-rule="evenodd"
					d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	{:else if state === PlayingState.STOPPING}
		<button on:click={start} class="btn btn-circle text-white pulse">
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 24 24" 
				fill="currentColor" 
				class="w-8 h-8"
			>
			<!-- Stop button -->
				<path
					fill-rule="evenodd"
					d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	{:else if state === PlayingState.PLAYING}
		<button on:click={stop} class="btn btn-circle text-white">
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 24 24" 
				fill="currentColor" 
				class="w-8 h-8"
			>
			<!-- Stop button -->
				<path
					fill-rule="evenodd"
					d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
					clip-rule="evenodd"
				/>
			</svg>
		</button> 
	{/if}
	<button on:click={startRecord} class="btn btn-circle text-white">
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			fill="currentColor" 
			class="w-8 h-8"
		>
		<!-- Record button -->
			<circle cx="12" cy="12" r="8" />
		</svg>
	</button> 
</div>

<style>
	.pulse {
		animation: pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>