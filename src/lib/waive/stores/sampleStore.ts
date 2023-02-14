import type { Sample } from "$lib/types/waive";
import { writable } from "svelte/store";


const initialState: Sample[] = [
    { active: false, index: 0, name: 'sample name' },
    { active: false, index: 1, name: 'sample name' },
    { active: false, index: 2, name: 'sample name' },
    { active: false, index: 3, name: 'sample name' },
];

function sampleStore() {
    const { subscribe, update } = writable<Sample[]>(initialState);

    return {
        subscribe,
        add: () => update(s => {

            // find first empty slot in the array
            const empty =  s.findIndex(i => i.active == false);
            
            // if none found, use the first slot, else use the one we found
            if (empty == -1){
                s[empty + 1].active = true;
            }
            else {
                s[empty].active = true;
            }

            return s;
        }),
        remove: (sample: Sample) => update(p => {            
            p[sample.index].active = false;
            return p;
        })
    }
}

export const samples = sampleStore();