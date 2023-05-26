<script lang="ts">
	import type { DrumType, InstrumentType, Sample, UndoableAction } from '$lib/types/waive';
	import type { Sampler } from '$lib/waive/audioEngine/sampler';
	import { get } from 'svelte/store';
	import { history } from '$lib/waive/stores/undo';
	import { selectedChain, sampleOptions } from '../stores/stores';
	import SampleSelection from './SampleSelection.svelte';
	import Waveform from '$lib/components/Waveform.svelte';
	import { cleanName, download, postRequest, ROOT_URL } from '$lib/scripts/utils';
	import { bufferToWave } from '../audioEngine/record';
	import IndicatorLed from '../instruments/IndicatorLed.svelte';
	
	export let sampler: Sampler;
	export let sampleOptionsKey: InstrumentType | DrumType;

	let options = sampleOptions[sampleOptionsKey];
	let current = sampler.current;
	let waveform = sampler.getWaveform();

	let currentOptions: Sample[] | undefined;

	sampleOptions[sampleOptionsKey]?.subscribe(value => {
		currentOptions = value;
	});

	const requestStrings: Record<string, string> = {
		"00_KD": "requestDrumSample",
		"01_SD": "requestDrumSample",
		"02_HH": "requestDrumSample",
		"03_CL": "requestDrumSample",
		"06_TH": "requestDrumSample",
		"LEAD": "requestSamplerSound",
	}

	function requestSample(z: number[] | null | undefined = null){
		if(typeof sampler.apiInstrumentName === 'undefined' || typeof requestStrings[sampler.apiInstrumentName] === 'undefined'){
			console.log("no valid sample request string", sampler.apiInstrumentName);
			return
		}

		const requestString = requestStrings[sampler.apiInstrumentName];

		postRequest(ROOT_URL, requestString, {
			instrument: sampler.apiInstrumentName, 
			z: z
		}).then((data) => {
			if(!data.ok){
				console.log("no data", data.error);
				return
			}

			if(typeof options === 'undefined'){
				return;
			}

			const name = cleanName(data.filename);
			for(let s of get(options)){
				if(s.name == name){
					return;
				}
			}

			const sample: Sample = {
				url: data.url,
				source: data.source,
				name: name,
				z: data.z,
			}

			const prevSample = current;
			const prevOptions = [...get(options)];
			const newOptions = [sample, ...prevOptions];
			const thisView = get(selectedChain);

			let action: UndoableAction = {
				name: "new sample",
				description: `new sample called "${sample.name}" added to options`,
				action: () => {
					if(typeof options === 'undefined'){
						return;
					}
					selectedChain.set(thisView);
					options.set(newOptions);
					selection(sample);
				},
				undo: () => {
					if(typeof options === 'undefined'){
						return;
					}
					selectedChain.set(thisView);
					options.set(prevOptions);
					selection(prevSample);
				}
			}

			history.newAction(action);
		})
	}

	function selection(sample: Sample | undefined){
		console.log("selection", sample?.name, sample?.url)
		current = sample;
		sampler.selectSample(current).then(() => {
			waveform = sampler.getWaveform();
		}).catch(() => {
			console.log("error with", sample?.url)
		});
	}

	function downloadSample(){
		// const offlineContext = new Tone.OfflineContext(2, sampler.buffer.duration + 0.5, 44100);
		// const playerAttributes = sampler.node.get();
		// playerAttributes.context = offlineContext;
		
		// const player = new Tone.Sampler(playerAttributes);
		// player.toDestination();
		// player.triggerAttackRelease(sampler.note, );

		// offlineContext.render().then(buffer => {
			const href = URL.createObjectURL(bufferToWave(sampler.buffer));
			download(href, sampler.current?.name+".wav");
		// })

	}

</script>

<div class="flex flex-col w-full max-w-[30rem] p-2 space-y-2 h-full max-h-screen justify-center items-center bg-gray-700 rounded-lg">
	<div class="flex flex-row justify-center items-center w-60 gap-x-2">
		<button
			class="flex flex-row justify-center place-items-center
					bg-gray-500 hover:bg-gray-600 btn btn-sm rounded-full w-12 h-8 text-sm"
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
			class="bg-gray-500 hover:bg-gray-600 btn btn-sm rounded-full text-sm"
			on:click={() => requestSample()}
		>
			new
		</button>
		<button 
			class="flex justify-center items-center content-center bg-gray-500 hover:bg-gray-600 btn btn-sm rounded-full text-sm"
			on:click={() => requestSample(sampler.current?.z)}
		>
			var
		</button>
		<button
			on:click={downloadSample}
			class="flex flex-row justify-center place-items-center bg-gray-500 hover:bg-gray-600 btn btn-sm rounded-full text-sm"
		>
			<!-- Download icon -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
				<path
					fill-rule="evenodd"
					d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
<!--		<IndicatorLed {sampler} />-->
	</div>

	<SampleSelection 
		bind:current={current} 
		bind:options={currentOptions} 
		on:selection={(event) => selection(event.detail)}
	/>
	<Waveform bind:waveform={waveform} />
</div>
