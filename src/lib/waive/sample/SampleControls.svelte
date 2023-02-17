<script lang="ts">
	import { samples } from '../stores/sample';
	import SampleSelection from './SampleSelection.svelte';

	function add() {
		samples.add();
	}
</script>

<div class="flex h-full flex-col place-items-center justify-center space-y-2 bg-gray-900 p-2">
	<div class="flex w-60 flex-row justify-between">
		<button
			class="btn flex h-8 w-12 
					flex-row place-items-center justify-center rounded-full bg-gray-500 text-sm hover:bg-gray-600"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-4 w-4"
			>
				<path
					fill-rule="evenodd"
					d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<button class="btn h-8 w-12 rounded-full bg-gray-500 text-sm hover:bg-gray-600">fx</button>

		<button on:click={add} class="btn h-8 w-28 rounded-full bg-gray-500 text-sm hover:bg-gray-600"
			>new sample</button
		>
	</div>

	<SampleSelection />
</div>
