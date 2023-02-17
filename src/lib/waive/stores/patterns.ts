import type { Pattern } from "$lib/types/waive";
import { writable, type Writable } from "svelte/store";
import { canvasStore } from "./canvas";
import { measureStore } from "./measure";
import { complexityStore } from "./complexity";

export type PatternStore = Writable<Pattern[]> & {
    initial(): void,
    add(): void
}

const complexity = complexityStore();
const measure = measureStore();
const canvas = canvasStore();

const patternInitialState: Pattern = {
    canvas: canvas.initial(),
    complexity: complexity.initial(),
    index: 0,
    measure: measure.initial(),
};

export function patternStore(){
    const { subscribe, set, update } = writable<Pattern[]>([]);

    return {
        subscribe,
        set,
        update,
        initial: () => {
            return []
        },
        add: () => {
            update(s => {
                s.push(patternInitialState)
                return s;
            })
        }
    }
};

