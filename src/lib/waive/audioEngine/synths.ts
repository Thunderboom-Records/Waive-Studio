import * as Tone from 'tone';

import { DrumType, NodeType, type FX, type InstrumentType, type NoteEvent } from '$lib/types/waive';
import type { Sampler } from './sampler';


const midiDrumMap: Record<number, DrumType> = {
	36: DrumType.KICK,
	38: DrumType.SNARE,
	42: DrumType.HIHAT,
	39: DrumType.CLAP,
	43: DrumType.TOM,
}

export function makeBassCallback(synth: any){
	let callback = (event: NoteEvent, time: number) => {
		synth.triggerAttackRelease(Tone.Frequency(event.note, "midi").toFrequency(), event.length, time);
	}

	return callback;
}

export function makeDrumsCallback(drumSynths: Record<string, (FX | Sampler)[]>){
	let synths: Record<string, Sampler> = {};
	for(const key in drumSynths){
		let FXChain = drumSynths[key];
		if(FXChain[0].type == NodeType.SAMPLER){
			synths[key] = FXChain[0] as Sampler;
		}
	}

	let callback = (event: NoteEvent, time: number) => {
		if(typeof midiDrumMap[event.note] === 'undefined'){
			return;
		}

		let type = midiDrumMap[event.note];
		if(typeof synths[type] === 'undefined'){
			return;
		}

		synths[type].play(event.velocity, time);
	}

	return callback;
}