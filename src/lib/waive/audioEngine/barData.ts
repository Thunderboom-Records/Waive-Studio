import type { NoteEvent } from "$lib/types/waive";

export class BarData {
    z: number[] | null;
    notes: NoteEvent[];
    gridNotes: number[][];

    constructor(notes: NoteEvent[], gridNotes: number[][]){
        this.z = null;
        this.notes = notes;
        this.gridNotes = gridNotes;
    }
}

export const drumChannelMidiMap: Record<number, number> = {
    0: 36,  // 00_KD
    1: 38,  // 01_SD
    2: 42,  // 02_HH
    3: 39,  // 03_CL
    4: 43,  // 06_TH
}

export const drumTypeMidiMap: Record<string, number> = {
    "KICK": 36,
    "SNARE": 38,
    "HIHAT": 42,
    "CLAP": 39,
    "TOM": 43,
}

export const midiDrumChannelMap: Record<number, number> = {};
for(let channel in drumChannelMidiMap){
    let midi = drumChannelMidiMap[channel]
    midiDrumChannelMap[midi] = parseInt(channel);
}

export function convertDrumNotesToNoteEvents(notes: number[][], threshold: number = 0.2){
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
            const length = '0:0:1';
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