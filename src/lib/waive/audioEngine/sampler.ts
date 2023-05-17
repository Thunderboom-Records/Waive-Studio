import * as Tone from 'tone';
import { ROOT_URL } from "$lib/scripts/utils";
import { NodeType, type FXParameter, type Sample } from "$lib/types/waive";
import type { Time } from 'tone/build/esm/core/type/Units';


export class Sampler {
    type: NodeType = NodeType.SAMPLER;
    bypassable: boolean = false;
    enabled: boolean = true;
    label: string = 'Sampler';
    parameters: FXParameter[] = [];
    current?: Sample;
    node: Tone.Sampler;
    buffer: Tone.ToneAudioBuffer;
    apiInstrumentName?: string;
    _note: number;

    constructor(context?: Tone.BaseContext, props: any = {}){
        if(typeof context === 'undefined'){
            context = Tone.getContext();
        }

        this._note = props.note ? props.note : 36;

        this.buffer = new Tone.ToneAudioBuffer();
        const sample_map: {[midi: number]: Tone.ToneAudioBuffer} = {};
        sample_map[this._note] = this.buffer;
        this.node = new Tone.Sampler({urls: sample_map, context: context, release: "0:1"});

        if(typeof props.current !== 'undefined'){
            this.selectSample(props.current);
        }
    }

    selectSample(sample: Sample | undefined){
        if(sample === this.current){
            return new Promise(() => {});
        }

        if(typeof sample === 'undefined' || sample === null || typeof sample.url === 'undefined'){
            this.removeSample();
            return new Promise(() => {});
        }

        this.current = sample;
        let url = ROOT_URL + "sample/" + sample.url

        this.node.releaseAll();
        return this.buffer.load(url)
    }

    removeSample(){
        this.current = undefined;
        this.buffer.dispose();
        this.buffer = new Tone.ToneAudioBuffer();
        const sample_map: {[midi: number]: Tone.ToneAudioBuffer} = {};
        sample_map[this._note] = this.buffer;
        this.node.set({urls: sample_map});
    }

    play(note?: number, velocity?: number, time: Time = Tone.immediate(), duration?: Time){
        if(this.buffer.loaded){
            if(typeof duration === 'undefined'){
                duration = Tone.Time(this.buffer.length, 'samples').toSeconds();
            }
            
            if(typeof note === 'undefined'){
                note = this._note;
            }

            this.node.triggerAttackRelease(note, duration, time, velocity)
        }
    }

    stop(){
        this.node.releaseAll();
    }

    getWaveform(){
        return this.buffer?.toArray(0) as Float32Array;
    }

    connect(node: Tone.ToneAudioNode){
        this.node.connect(node);
    }

    toDestination(){
        this.node.toDestination();
    }

    set note(v: number){
        this._note = v;
        const sample_map: {[midi: number]: Tone.ToneAudioBuffer} = {};
        sample_map[this._note] = this.buffer;
        this.node.set({urls: sample_map});
    }

    get note(){
        return this._note;
    }
    
}