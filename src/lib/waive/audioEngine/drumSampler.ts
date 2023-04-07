import type { InputNode } from 'tone';
import * as Tone from 'tone';

export class DrumSampler {
    name: string;
    buffer: Tone.ToneAudioBuffer;
    temp_buffer: Tone.ToneAudioBuffer;
    sampler: Tone.Sampler;

    constructor(url?: string, midiNote: number = 60) {
        this.name = 'DrumSampler';
        this.buffer = new Tone.ToneAudioBuffer();
        this.temp_buffer = new Tone.ToneAudioBuffer();
        const samples: Record<number, Tone.ToneAudioBuffer> = {};
        samples[midiNote] = this.buffer;
        this.sampler = new Tone.Sampler(samples);
    }

    setSample(url: string){
        this.buffer.load(url);
    }

    connect(destination: InputNode): DrumSampler {
        this.sampler.connect(destination);
        return this;
    }
    
}

