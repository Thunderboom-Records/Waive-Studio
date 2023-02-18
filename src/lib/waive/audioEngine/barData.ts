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
        return;
    }

}
