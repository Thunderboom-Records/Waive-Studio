import * as Tone from 'tone';
import { ROOT_URL } from "$lib/scripts/utils";
import { NodeType, type FXParameter, type Sample } from "$lib/types/waive";

export class Sampler {
    type: NodeType = NodeType.SAMPLER;
    bypassable: boolean = false;
    enabled: boolean = true;
    label: string = 'Sampler';
    parameters: FXParameter[] = [];
    options: Sample[] = [];
    current?: Sample;
    node: Tone.Player;
    buffer: Tone.ToneAudioBuffer;
    velocity: Tone.Gain;
    apiInstrumentName?: string;

    constructor(){
        this.velocity = new Tone.Gain();
        this.buffer = new Tone.ToneAudioBuffer();
        this.node = new Tone.Player(this.buffer);
    }

    addSample(sample?: Sample){
        // if(this.current === sample){
        //     return
        // }
        if(typeof(sample) === 'undefined' || typeof(sample.url) === 'undefined'){
            return;
        }
        this.current = sample;
        let url = ROOT_URL + "drum/" + sample.url

        this.node.stop();
        this.buffer.load(url).then(() => {
        });
    }

    play(){
        if(this.buffer.loaded){
            this.node.start(0);
        }
    }
}