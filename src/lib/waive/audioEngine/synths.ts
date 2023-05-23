import * as Tone from 'tone';

import { DrumType, NodeType, type FX, type NoteEvent, type FXParameter, type Chain } from '$lib/types/waive';
import { SoundSource } from './sampler';
import { getChainSource } from '$lib/scripts/utils';


const midiDrumMap: Record<number, DrumType> = {
	36: DrumType.KICK,
	38: DrumType.SNARE,
	42: DrumType.HIHAT,
	39: DrumType.CLAP,
	43: DrumType.TOM,
}

export function makeMelodyCallback(synth?: SoundSource, noteOffset: number = 0){
	if(typeof synth === 'undefined'){
		console.log("makeMelodyCallback: synth undefined")
		return () => {};
	}
	let callback = (event: NoteEvent, time: number) => {
		synth.play(Tone.Frequency(event.note + noteOffset, "midi").toFrequency(), event.velocity, time, event.length);
	}

	return callback;
}

export function makeDrumsCallback(drumSynths: Record<string, Chain>){
	let synths: Record<string, SoundSource | undefined> = {};
	for(const key in drumSynths){
		synths[key] = getChainSource(drumSynths[key]);
	}

	let callback = (event: NoteEvent, time: number) => {
		if(typeof midiDrumMap[event.note] === 'undefined'){
			return;
		}

		let type = midiDrumMap[event.note];

		synths[type]?.play(event.note, event.velocity, time, "16n");
	}

	return callback;
}

export class BassSynth extends SoundSource {
	type: NodeType = NodeType.SAMPLER;
	bypassable: boolean = false;
    enabled: boolean = true;
	label: string = 'Sampler';
	parameters: FXParameter[] = [];
	node: Tone.MonoSynth;

	constructor(context?: Tone.BaseContext, fxProps: any = {}){
		super();
		if(typeof context === 'undefined'){
            context = Tone.getContext();
        }

		if(!fxProps.context){
			fxProps.context = context;
		}

		this.node = new Tone.MonoSynth(fxProps);
		this.input = this.node.input;
		this.output = this.node.output;
	}

	play(note?: number, velocity?: number, time?: Tone.Unit.Time, duration?: Tone.Unit.Time): void {
		if(typeof note === 'undefined'){
			note = 48;
		}
		if(typeof duration === 'undefined'){
			duration = "0:1";
		}

		this.node.triggerAttackRelease(note, duration, time, velocity);
		this.callback(note);
	}
}