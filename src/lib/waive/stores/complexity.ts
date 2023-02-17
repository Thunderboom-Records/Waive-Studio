import type { Complexity } from "$lib/types/waive";
import { writable } from "svelte/store";

const complexityInitialState: Complexity = {
    current: 0,
    initial: 0,
    max: 1,
    min: 0
};

export function complexityStore(){
    const { subscribe, update } = writable<Complexity>(complexityInitialState)

    return {
        subscribe,
        initial: () => {
            return complexityInitialState
        }
    }
}
