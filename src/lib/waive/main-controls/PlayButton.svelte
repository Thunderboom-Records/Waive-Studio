<script lang="ts">
	enum PlayingState {
		NEW,
		RUNNING,
		PAUSED
	}

	export let elapsedTime: number = 0;

	let state: PlayingState = PlayingState.NEW;
	let startTime: number = 0;
	let pausedTime: number = 0;

	const start = () => {
		startTime = Date.now();
		state = PlayingState.RUNNING;
		setInterval(() => {
			if (state === PlayingState.RUNNING) {
				const endTime = Date.now();
				elapsedTime = endTime - startTime + pausedTime;
			}
		});
	};

	const pause = () => {
		state = PlayingState.PAUSED;
		pausedTime = elapsedTime;
	};

	const resume = () => {
		startTime = Date.now();
		state = PlayingState.RUNNING;
	};
</script>

{#if state === PlayingState.NEW}
	<button on:click={start} class="btn btn-circle text-white">
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
{:else if state === PlayingState.RUNNING}
	<button on:click={pause} class="btn btn-circle text-white">
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
{:else if state === PlayingState.PAUSED}
	<button on:click={resume} class="btn btn-circle text-white">
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
{/if}
