import * as Tone from 'tone';
import type { Part } from 'tone';
import type { BarData } from './barData';
import type { NoteEvent, SynthCallback } from '$lib/types/waive';


function splitTimeString(time: string){
    let bbs = time.split(":");
    let bar = 0;
    let beat = 0;
    let sixteenth = 0;
    if(bbs.length == 3){
        bar = parseInt(bbs[0]);
        beat = parseInt(bbs[1]);
        sixteenth = parseInt(bbs[2]);
    } else if(bbs.length == 2){
        beat = parseInt(bbs[0]);
        sixteenth = parseInt(bbs[1]);
    } else if(bbs.length == 1){
        sixteenth = parseInt(bbs[0]);
    }

    return {bar, beat, sixteenth}
}


export class Arrangement {
    length: number;
    arrangement: (BarData | null)[];
    part: Part | null;
    synthCallback: SynthCallback;
    midi: string | null;
    timings: NoteEvent[] | null;
    midiOffset: number;

    constructor(length: number = 4){
        this.length = length;
        this.arrangement = [];
        this.part = null;
        this.synthCallback = () => {};
        this.midi = null;
        this.timings = null;
        this.midiOffset = 0;
    }

    isEmpty(){
        for(let i = 0; i < this.length; i++){
            if(this.arrangement[i]){
                return false;
            }
        }
        return true;
    }

    add(bar: BarData, i: null | number){
        if(i !== null){
            this.arrangement[i] = bar;
        } else {
            // add to first avaliable slot
            for(let i = 0; i < this.length; i++){
                if(!this.arrangement[i]){
                    this.arrangement[i] = bar;
                    break;
                }
            }
        }

        this.updatePart();
    }

    remove(i: number){
        this.arrangement[i] = null;
        this.updatePart();
    }

    at(i: number){
        return this.arrangement[i];
    }

    updatePart() {
        this.timings = [];
        for(let i = 0; i < this.length; i++){
            let notes = this.arrangement[i]?.notes;
            if(!notes){
                continue;
            }
            for(let n of notes){
                const note = n.note + this.midiOffset;

                let bbs = splitTimeString(n.time);
                let time = `${bbs.bar + i}:${bbs.beat}:${bbs.sixteenth}`;

                this.timings.push({note, time, length: n.length, velocity: n.velocity});
            }
        }

        this.midi = null;

        if(this.part){
            this.part.dispose();
        }

        this.part = new Tone.Part((time, val) => {
            this.synthCallback(val, time);
        }, this.timings)

        this.part.start(0);
    }

    start(time: number = 0){
        if(!this.part) return;
        
        this.part.start(time);
    }

    stop(){
        if(!this.part) return;
        
        this.part.stop();
    }

    toMidi(){
        // TODO
        if(this.midi){
            return this.midi;
        }

        return "";
    }
}