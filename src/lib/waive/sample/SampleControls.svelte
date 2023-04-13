<script lang="ts">
	import SampleSelection from './SampleSelection.svelte';
	import { cleanName, postRequest, ROOT_URL } from '$lib/scripts/utils';
	import type { Sample } from '$lib/types/waive';
	import type { Sampler } from '$lib/waive/audioEngine/sampler';

	export let sampler: Sampler;

	let z: number[] | null = null;

	function requestSample(){
		postRequest(ROOT_URL, 'requestDrumSample', {
			instrument: sampler.apiInstrumentName, 
			z: z
		}).then((data) => {
			if(!data.ok){
				console.log("no data");
				return
			}
			let name = cleanName(data.filename);
			for(let s of sampler.options){
				if(s.name == name){
					return;
				}
			}

			let sample: Sample = {
				url: data.drum_samples,
				source: data.source,
				name: name,
				z: data.z,
			}
			sampler.options = [sample, ...sampler.options];
			sampler.current = sample;
			z = data.z;
		})
	}

</script>

<div class="flex flex-col p-2 space-y-2 h-full justify-center place-items-center bg-gray-700 rounded-lg">
	<div class="flex flex-row justify-between w-60 gap-x-2">
		<button
			class="flex flex-row justify-center place-items-center 
					bg-gray-500 hover:bg-gray-600 btn rounded-full w-12 h-8 text-sm"
			on:click={() => sampler.play()}
		>
			<!-- Play button -->
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

		<button 
			class="bg-gray-500 hover:bg-gray-600 btn rounded-full w-28 h-8 text-sm"
			on:click={requestSample}
		>
			new
		</button>
		<button 
			class="bg-gray-500 hover:bg-gray-600 btn rounded-full w-28 h-8 text-sm"
			on:click={requestSample}
		>
			var
		</button>
	</div>

	{#key sampler}
		<SampleSelection {sampler}/>
	{/key}
</div>
