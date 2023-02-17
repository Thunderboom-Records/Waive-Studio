import type { NoteEvent } from "$lib/types/waive";

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
