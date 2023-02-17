import type { Effect } from "$lib/types/waive";
import { writable } from "svelte/store";

const effectInitialState: Effect = {

}

export function effectStore() {
    const { subscribe, set, update } = writable<Effect>(effectInitialState);

    return {
        subscribe,
        set,
        update,
        initial: () => {
            return [];
        }
    }
}