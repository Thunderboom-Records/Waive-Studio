import type { NoteEvent } from '$lib/types/waive';
import * as Tone from 'tone';

export const bassSynth = new Tone.MonoSynth({
	"portamento": 0.2,
	"oscillator":{
    	"type": "sawtooth",
	},
	"envelope":{
    	"attack": 0.01,
    	"decay": 0.2,
    	"sustain": 0.2,
    	"release": 1.0,
	},
	"filterEnvelope":{
    	"attack": 0.01,
    	"decay": 0.2,
    	"sustain": 0.2,
    	"release": 1.0,
    	"octaves": 3.0,
	},
	"filter":{
    	"type": "lowpass",
    	"Q": 1.0,
	}
}).toDestination();

export function bassCallback(event: NoteEvent, time: number) {
    bassSynth.triggerAttackRelease(Tone.Frequency(event.note, "midi").toFrequency(), event.length, time);
    return;
}