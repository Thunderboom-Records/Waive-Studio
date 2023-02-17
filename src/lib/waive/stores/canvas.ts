import type { Canvas } from "$lib/types/waive";
import { writable } from "svelte/store";

const canvasInitialState: Canvas = {
    w: 0,
    h: 0,
    color: { name: "", 500: "", 600: "" }
}

export function canvasStore() {
    const { subscribe, update } = writable<Canvas>(canvasInitialState);

    return {
        subscribe,
        initial: () => {
            return canvasInitialState;
        }
    }
}