import type { Measure } from "$lib/types/waive";
import { writable } from "svelte/store";

const measureInitialState: Measure = {
    notes: []
};

export function measureStore(){
    const { subscribe, update } = writable<Measure>(measureInitialState);

    return {
        subscribe,
        initial: () => {
            return measureInitialState
        }
    }
}