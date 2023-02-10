<script lang="ts">
	import SampleSelection from './SampleSelection.svelte';

	export let pattern: string;
</script>

<div class="flex flex-col p-2 space-y-2 bg-gray-900 h-full justify-center content-center">
	<div class="flex flex-row justify-evenly">
		<button class="bg-gray-600 btn rounded-xl w-8 h-6 text-sm place-items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-4 h-4"
			>
				<path
					fill-rule="evenodd"
					d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<button class="bg-gray-600 btn rounded-xl w-8 h-6 text-sm">fx</button>

		<button class="bg-gray-600 btn rounded-xl w-24 h-6 text-sm">new sample</button>
	</div>

	<SampleSelection />
</div>
