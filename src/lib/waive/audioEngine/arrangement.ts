import * as Tone from 'tone';
import type { Part } from 'tone';
import type { BarData } from './barData';
import type { NoteEvent, SynthCallback } from '$lib/types/waive';
import { splitTimeString } from '$lib/scripts/utils';


export class Arrangement {
    length: number;
    arrangement: (BarData | null)[];
    part: Part | null;
    synthCallback: SynthCallback;
    midi: string | null;
    timings: NoteEvent[] | null;
    midiOffset: number;

    constructor(length: number = 4) {
        this.length = length;
        this.arrangement = [];
        this.arrangement.length = 4;
        this.part = null;
        this.synthCallback = () => { };
        this.midi = null;
        this.timings = null;
        this.midiOffset = 0;
    }

    isEmpty() {
        for (let i = 0; i < this.length; i++) {
            if (this.arrangement[i]) {
                return false;
            }
        }
        return true;
    }

    add(bar: BarData, i?: number) {
        if (typeof i === 'undefined') {
            for (let idx = 0; idx < this.length; idx++) {
                if (!this.arrangement[idx]) {
                    i = idx;
                    break;
                }
            }
        }

        if (typeof i === 'undefined') {
            return
        }

        this.arrangement[i] = bar;
        console.log(`added to ${i}, (length now ${this.arrangement.length})`);
        this.updatePart();
    }

    move(from: number, to: number) {
        this.arrangement[to] = this.arrangement[from];
        this.arrangement[from] = null;
        this.updatePart();
    }

    copy(from: number, to: number) {
        this.arrangement[to] = this.arrangement[from];
        this.updatePart();
    }

    remove(i: number) {
        this.arrangement[i] = null;
        this.updatePart();
    }

    at(i: number) {
        return this.arrangement[i];
    }

    updatePart() {
        this.timings = [];
        for (let i = 0; i < this.length; i++) {
            let notes = this.arrangement[i]?.notes;
            if (!notes) {
                continue;
            }
            for (let n of notes) {
                const note = n.note + this.midiOffset;

                let bbs = splitTimeString(n.time);
                let time = `${bbs.bar + i}:${bbs.beat}:${bbs.sixteenth}`;

                this.timings.push({ note, time, length: n.length, velocity: n.velocity });
            }
        }

        this.midi = null;

        if (this.part) {
            this.part.dispose();
        }

        this.part = new Tone.Part((time, val) => {
            this.synthCallback(val, time);
        }, this.timings)

        this.part.start(0);
    }

    start(time: number = 0) {
        if (!this.part) return;

        this.part.start(time);
    }

    stop() {
        if (!this.part) return;

        this.part.stop();
    }

    toMidi() {
        // TODO
        if (this.midi) {
            return this.midi;
        }

        this.midi = "";
        return this.midi;
    }
}