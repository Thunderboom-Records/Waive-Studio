<script lang="ts">
	import { Channel, type ToneAudioNode } from 'tone';

	import { InstrumentType, type Bar, type Instrument, type FX, DrumType, type UndoableAction } from '$lib/types/waive';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBars from '../pattern/PatternBars.svelte';
	import { postRequest, ROOT_URL } from '$lib/scripts/utils';
	import {
		BarData,
		convertDrumNotesToNoteEvents,
		convertMelodyNotesToNoteEvents
	} from '../audioEngine/barData';
	import ChainSelect from './ChainSelect.svelte';
	import { history } from '$lib/waive/stores/undo';
	import { arrangements, thresholds } from '../stores/stores';
	import { writable } from 'svelte/store';
	import { ValueParameter } from '../audioEngine/parameter';
	import FxKnob from '../fxControls/FxKnob.svelte';

	export let instrument: Instrument;
	export let row: number;
	export let channelNode: ToneAudioNode | undefined;

	let bars: Bar[] = [];
	let selectedIndex: number = -1;

	let complexity: ValueParameter;

	function updateComplexity(value: any){
		if(thresholds[InstrumentType.DRUMS]){
			thresholds[InstrumentType.DRUMS].set(0.8 - value["complexity"])
		}
	}

	if(instrument.type === InstrumentType.DRUMS){
		complexity = new ValueParameter("complexity", 0.6, 0.0, 0.8);
		complexity.callback = updateComplexity;
		
		thresholds[InstrumentType.DRUMS] = writable(0.8 - complexity.value);

		thresholds[InstrumentType.DRUMS].subscribe((value: number) => {
			arrangements[InstrumentType.DRUMS].update((arrangement) => {
				arrangement.threshold = value;
				return arrangement;
			})
		});
	}

	function requestClip(event: any) {
		let data: any = {};
		if(event.detail?.variation){
			if(event.detail.z){
				data.z = event.detail.z;
			} else {
				data.z = bars[selectedIndex].barData.z;
			}	
		}

		postRequest(ROOT_URL, instrument.apiPatternRequest, data).then((data: any) => {
			if (!data || !data.ok) {
				console.log('no clip data', data.error);
				return;
			}

			let barNotes;
			if (instrument.type === InstrumentType.DRUMS) {
				barNotes = convertDrumNotesToNoteEvents(data.notes, 0.2);
			} else {
				barNotes = convertMelodyNotesToNoteEvents(data.notes, 24);
			}

			const barData = new BarData(barNotes, data.notes);
			barData.z = data.z;

			let clip = {
				active: true,
				barData: barData
			};

			if(typeof event.detail?.add !== 'undefined'){
				swapClip(clip, event.detail?.add);
			} else {
				addClipToPool(clip);
			}

		});
	}

	function addClipToPool(clip: Bar){
		let action: UndoableAction = {
			name: 'requested bar',
			description: `new bar received for ${instrument.type}`,
			action: () => {
				bars.push(clip);
				bars = bars;
				selectedIndex = bars.length - 1;
			},
			undo: () => {
				bars = bars.slice(0, bars.length - 1);
				selectedIndex = bars.length - 1;
			}
		}

		history.newAction(action);
	}

	function swapClip(clip: Bar, i: number){
		let oldBarData = instrument.arrangement.at(i)

		let action: UndoableAction = {
			name: 'clip variation',
			description: `new variation received for ${instrument.type}`,
			action: () => {
				arrangements[instrument.type].update(v => {
					v.add(clip.barData, i);
					return v;
				})
			},
			undo: () => {
				arrangements[instrument.type].update(v => {
					v.add(oldBarData, i);
					return v;
				})
			}
		}

		history.newAction(action);
	}

	function deleteClip(event: any){
		let i = event.detail;

		let oldClip = bars[i];
		let oldSelected = selectedIndex;

		let action: UndoableAction = {
			name: 'delete clip',
			description: `deleting clip ${i}`,
			action: () => {
				bars.splice(i, 1);
				bars = bars;
				selectedIndex -= 1;
			},
			undo: () => {
				bars.splice(i, 0, oldClip);
				bars = bars;
				selectedIndex = oldSelected;
			}
		}

		history.newAction(action);
	}

	function addBar(event: any){
		let data = event.detail;
		if(data.type !== instrument.type){
			return;
		}
		
		let barData = data.barData;
		let oldBarData = instrument.arrangement.at(data.i)

		let action: UndoableAction = {
			name: 'add pattern',
			description: 'adding a new pattern',
			action: () => {
				arrangements[instrument.type].update(v => {
					v.add(barData, data.i);
					return v;
				})
			},
			undo: () => {
				arrangements[instrument.type].update(v => {
					v.add(oldBarData, data.i);
					return v;
				})
			}
		}

		history.newAction(action);	
	}

	function removeBar(event: any){
		let data = event.detail;
		if(data.type !== instrument.type){
			return;
		}

		let oldBarData = instrument.arrangement.at(data.i)

		let action: UndoableAction = {
			name: 'removeBar',
			description: `removing bar from position ${data.i} in ${data.type}`,
			action: () => {
				arrangements[instrument.type].update(v => {
					v.remove(data.i);
					return v;
				})
			},
			undo: () => {
				arrangements[instrument.type].update(v => {
					v.add(oldBarData, data.i);
					return v;
				})
			}
		}

		history.newAction(action);
	}

</script>

<!-- Col 1: Clip Controls -->
<div class="flex bg-gray-900 py-2 col-start-1 row-start-{row}">
	<PatternControls on:newClip={requestClip} {instrument} bind:selectedIndex={selectedIndex}/>
	<PatternBars on:newClip={requestClip} on:deleteClip={deleteClip} bind:bars={bars} {instrument} bind:selectedIndex={selectedIndex}/>
</div>

<!-- Col 2: Sample Controls -->
{#if instrument.type == InstrumentType.DRUMS}
	<div class="flex justify-between items-center bg-gray-900 col-start-2 row-start-{row} h-full px-2">
		<div>
			<FxKnob parameter={complexity}/>
		</div>
		<div class="flex flex-col py-2 justify-between items-center gap-1 h-full">
			<ChainSelect key={DrumType.KICK} on:switch>kick</ChainSelect>
			<ChainSelect key={DrumType.SNARE} on:switch>snare</ChainSelect>
			<ChainSelect key={DrumType.HIHAT} on:switch>hihat</ChainSelect>
			<ChainSelect key={DrumType.CLAP} on:switch>clap</ChainSelect>
			<ChainSelect key={DrumType.TOM} on:switch>tom</ChainSelect>
		</div>
		
	</div>
{:else}
	<div class="flex justify-between items-center bg-gray-900 col-start-2 row-start-{row} h-full px-2">
		<div>
			<FxKnob parameter={complexity} disabled={true} label={"complexity"}/>
		</div>
		<ChainSelect key={instrument.type} on:switch>{instrument.type.toLowerCase()}</ChainSelect>
	</div>
{/if}

<!-- Col 3-6: Player Display -->
<PlayerSection {row} bind:instrument={instrument} on:addBar={addBar} on:removeBar={removeBar} on:newClip={requestClip} />

<!-- Col 7: Channel controls -->
<div class="col-start-7 row-start-{row}">
	{#if channelNode && channelNode instanceof Channel}
		<SmToggles {channelNode} />
	{/if}
</div>
