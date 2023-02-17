import type { Arrangement } from "$lib/types/waive";
import { writable } from "svelte/store";
import { measureStore } from "./measure";

const arrangementInitialState: Arrangement = {
    measures: [
        measureStore().initial(),
        measureStore().initial(),
        measureStore().initial(),
        measureStore().initial()
    ],
}

export function arrangementStore() {
    const { subscribe, set, update } = writable<Arrangement>(arrangementInitialState);

    return {
        subscribe,
        set,
        update,
        initial: () => {
            return arrangementInitialState;
        }
    }
}