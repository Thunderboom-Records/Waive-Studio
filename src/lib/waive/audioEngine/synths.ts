import type { ToneAudioBuffer } from 'tone';
import * as Tone from 'tone';

import type { NoteEvent } from '$lib/types/waive';

const KD_Buffer = new Tone.ToneAudioBuffer();
const SD_Buffer = new Tone.ToneAudioBuffer();
const HH_Buffer = new Tone.ToneAudioBuffer();
const CL_Buffer = new Tone.ToneAudioBuffer();
const TH_Buffer = new Tone.ToneAudioBuffer();

export const drumBuffers: Record<string, ToneAudioBuffer> = {
	'00_KD': KD_Buffer,
	'01_SD': SD_Buffer,
	'02_HH': HH_Buffer,
	'03_CL': CL_Buffer,
	'04_TH': TH_Buffer,
};

// TODO: make each drum channel separate Samplers 
// for individual wave shaping/FX chains
export const drumSampler = new Tone.Sampler({
	36: KD_Buffer,
	38: SD_Buffer,
	42: HH_Buffer,
	39: CL_Buffer,
	43: TH_Buffer,
}).toDestination();


export const bassSynth = new Tone.MonoSynth({
	"portamento": 0.2,
	"oscillator": {
		"type": "sawtooth",
	},
	"envelope": {
		"attack": 0.01,
		"decay": 0.2,
		"sustain": 0.2,
		"release": 1.0,
	},
	"filterEnvelope": {
		"attack": 0.01,
		"decay": 0.2,
		"sustain": 0.2,
		"release": 1.0,
		"octaves": 3.0,
	},
	"filter": {
		"type": "lowpass",
		"Q": 1.0,
	}
}).toDestination();


export function makeBassCallback(synth: any){
	let callback = (event: NoteEvent, time: number) => {
		synth.triggerAttackRelease(Tone.Frequency(event.note, "midi").toFrequency(), event.length, time);
	}

	return callback;
}