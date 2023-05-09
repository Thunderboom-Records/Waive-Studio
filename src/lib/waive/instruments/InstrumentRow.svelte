<script lang="ts">
	import { Channel, type ToneAudioNode } from 'tone';

	import { InstrumentType, type Bar, type Instrument, type FX, DrumType, type UndoableAction } from '$lib/types/waive';
	import SmToggles from '../pattern/SmControls.svelte';
	import PlayerSection from '../player/PlayerSection.svelte';
	import PatternControls from '../pattern/PatternControls.svelte';
	import PatternBars from '../pattern/PatternBars.svelte';
	import { getRequest, ROOT_URL } from '$lib/scripts/utils';
	import {
		BarData,
		convertDrumNotesToNoteEvents,
		convertMelodyNotesToNoteEvents
	} from '../audioEngine/barData';
	import ChainSelect from './ChainSelect.svelte';
	import { history } from '$lib/waive/stores/undo';
	import { arrangements } from '../stores/stores';

	export let instrument: Instrument;
	export let row: number;
	export let channelNode: ToneAudioNode | undefined;

	let bars: Bar[] = [];
	let selectedIndex: number = -1;

	function requestPattern() {
		getRequest(ROOT_URL, instrument.apiPatternRequest, {}).then((data: any) => {
			if (!data || !data.ok) {
				console.log('no pattern data');
				return;
			}

			let barNotes;
			if (instrument.type == InstrumentType.DRUMS) {
				barNotes = convertDrumNotesToNoteEvents(data.notes);
			} else {
				barNotes = convertMelodyNotesToNoteEvents(data.notes, 24);
			}

			const barData = new BarData(barNotes, data.notes);
			barData.z = data.z;

			let bar = {
				active: true,
				barData: barData
			};

			let action: UndoableAction = {
				name: 'requested bar',
				description: `new bar received for ${instrument.type}`,
				action: () => {
					bars.push(bar);
					bars = bars;
					selectedIndex = bars.length - 1;
				},
				undo: () => {
					bars = bars.slice(0, bars.length - 1);
					selectedIndex = bars.length - 1;
				}
			}

			history.newAction(action);
		});
	}

	function addBar(event: any){
		let data = event.detail;
		if(data.type !== instrument.type){
			return;
		}
		
		let barData = bars[data.index].barData;
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
	<PatternControls on:newBar={requestPattern} {instrument}/>
	<PatternBars on:newBar={requestPattern} bind:bars={bars} {instrument} bind:selectedIndex={selectedIndex}/>
</div>

<!-- Col 2: Sample Controls -->
{#if instrument.type == InstrumentType.DRUMS}
	<div class="flex flex-col bg-gray-900 py-2 justify-between items-center gap-2 col-start-2 row-start-{row} h-full">
		<ChainSelect key={DrumType.KICK} on:switch>kick</ChainSelect>
		<ChainSelect key={DrumType.SNARE} on:switch>snare</ChainSelect>
		<ChainSelect key={DrumType.HIHAT} on:switch>hihat</ChainSelect>
		<ChainSelect key={DrumType.CLAP} on:switch>clap</ChainSelect>
		<ChainSelect key={DrumType.TOM} on:switch>tom</ChainSelect>
	</div>
{:else}
	<div class="flex flex-row flex-wrap bg-gray-900 p-2 place-content-evenly gap-x-2 col-start-2 row-start-{row}">
		<ChainSelect key={instrument.type} on:switch>{instrument.type.toLowerCase()}</ChainSelect>
	</div>
{/if}

<!-- Col 3-6: Player Display -->
<PlayerSection {row} bind:instrument={instrument} on:addBar={addBar} on:removeBar={removeBar}/>

<!-- Col 7: Channel controls -->
<div class="col-start-7 row-start-{row}">
	{#if channelNode && channelNode instanceof Channel}
		<SmToggles {channelNode} />
	{/if}
	<!-- <DownloadButton {instrument} /> -->
</div>
