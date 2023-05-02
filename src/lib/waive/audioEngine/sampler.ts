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
    node: Tone.AmplitudeEnvelope;
    buffer: Tone.ToneAudioBuffer;
    player: Tone.Player;
    apiInstrumentName?: string;

    constructor(context?: Tone.BaseContext, props: any = {}){
        if(typeof context === 'undefined'){
            context = Tone.getContext();
        }

        if(typeof props.ampEnv === 'undefined'){
            props.ampEnv = {
                attack: 0.0,
                decay: 0.0,
                sustain: 1.0,
                release: 1.0,
            }
        }

        props.ampEnv.context = context;

        this.node = new Tone.AmplitudeEnvelope(props.ampEnv);
        this.buffer = new Tone.ToneAudioBuffer();
        this.player = new Tone.Player({url:this.buffer, context:context});

        this.player.connect(this.node);

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
        let url = ROOT_URL + "drum/" + sample.url

        this.player.stop();
        return this.buffer.load(url)
    }

    removeSample(){
        this.current = undefined;
        this.buffer.dispose();
        this.buffer = new Tone.ToneAudioBuffer();
        this.player.buffer = this.buffer;
    }

    play(velocity?: number | undefined, time?: Time | undefined){
        if(this.buffer.loaded){
            this.player.start(time);
            this.node.triggerAttackRelease(1.0, time, velocity)
        }
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
}