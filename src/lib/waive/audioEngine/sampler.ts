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
    // options: Sample[] = [];
    current?: Sample;
    node: Tone.AmplitudeEnvelope;
    buffer: Tone.ToneAudioBuffer;
    player: Tone.Player;
    apiInstrumentName?: string;

    constructor(){
        this.node = new Tone.AmplitudeEnvelope({
            attack: 0.0,
            decay: 0.0,
            sustain: 1.0,
            release: 1.0,
        })
        this.buffer = new Tone.ToneAudioBuffer();
        this.player = new Tone.Player(this.buffer);

        this.player.connect(this.node);
    }

    selectSample(sample?: Sample){
        if(typeof sample === 'undefined' || typeof sample.url === 'undefined'){
            this.removeSample();
            return;
        }
        this.current = sample;
        let url = ROOT_URL + "drum/" + sample.url

        this.player.stop();
        this.buffer.load(url).then(() => {console.log("sample loaded")});
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
}