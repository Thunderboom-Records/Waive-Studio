import type { NoteEvent } from "$lib/types/waive";

// /!\ Possibly redundant for transition to svelte/stores...

export class BarData {
    z: number[] | null;
    notes: NoteEvent[];

    constructor(notes: NoteEvent[]){
        this.z = null;
        this.notes = notes;
    }

    renderToCanvas() {
        // not where this should be...
        return;
    }
}

export const drumChannelMidiMap: Record<number, number> = {
    0: 36,  // 00_KD
    1: 38,  // 01_SD
    2: 42,  // 02_HH
    3: 39,  // 03_CL
    4: 43,  // 04_TH
}

export function convertDrumNotesToNoteEvents(notes: number[][], threshold: number = 0.5){
    let noteEvents: NoteEvent[] = [];
    for(let drumChannel = 0; drumChannel < notes.length; drumChannel++){
        for(let i = 0; i < notes[drumChannel].length; i++){
            if(notes[drumChannel][i] < threshold){
                continue;
            }

            const beat = Math.floor(i / 4);
            const sixteenth = i % 4;
            const time = `${beat}:${sixteenth}`;

            const note = drumChannelMidiMap[drumChannel];
            const length = '48i';
            const velocity = notes[drumChannel][i];

            noteEvents.push({
                time,
                note,
                length,
                velocity,
            })
        }
    }

    return noteEvents;
}

export function convertMelodyNotesToNoteEvents(notes: number[][], midiOffset: number = 60){
    let noteEvents: NoteEvent[] = [];

    for(const noteData of notes){
        const beat = Math.floor(noteData[1] / 4);
        const sixteenth = noteData[1] % 4;
        const durationBeats = Math.floor(noteData[2] / 4);
        const durationSixteenths = noteData[2] % 4;

        const time = `${beat}:${sixteenth}`;
        const length = `${durationBeats}:${durationSixteenths}`;
        const note = noteData[0] + midiOffset;
        const velocity = noteData[3];

        noteEvents.push({
            time,
            note,
            length,
            velocity,
        })
    }

    return noteEvents;
}