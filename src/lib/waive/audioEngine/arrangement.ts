import type { Part } from 'tone';
import type { Bar, NoteEvent, SynthCallback } from '$lib/types/waive';


export class Arrangement {
    length: number;
    arrangement: (Bar | null)[];
    part: Part | null;
    synthCallback: SynthCallback;
    midi: string | null;
    timings: NoteEvent[] | null;

    constructor(length: number = 4){
        this.length = length;
        this.arrangement = [];
        this.part = null;
        this.synthCallback = () => {};
        this.midi = null;
        this.timings = null;
    }

    isEmpty(){
        for(let i = 0; i < this.length; i++){
            if(this.arrangement[i]){
                return false;
            }
        }
        return true;
    }

    add(bar: Bar, i: null | number){
        if(i){
            this.arrangement[i] = bar;
        } else {
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
        return;
    }

    start(time: number = 0){
        if(!this.part) return;
        
        this.part.start(time);
    }

    stop(){
        if(!this.part) return;
        
        this.part.stop();
    }
}