import type { Signature } from '$lib/types/waive';
import { writable } from 'svelte/store';


const initialSignatureState: Signature = {
	beatsPerMeasure: 4,
	notesPerBeat: 4,
	beatsPerMinute: 120,
}

function signatureStore(){
	const { subscribe, update } = writable<Signature>(initialSignatureState);

	return {
		subscribe,
		initial: () => {
			return initialSignatureState
		}
	}
}

export const signature = signatureStore();

// const initialState: Pattern[] = [
// 	{ index: 0, active: false },
// 	{ index: 1, active: false },
// 	{ index: 2, active: false },
// 	{ index: 3, active: false },
// 	{ index: 4, active: false }
// ];

// export type PatternStore = {
// 	add(): void;
// 	remove(pattern: Pattern): void;
// };

// export function patternStore() {
// 	const { subscribe, update } = writable<Pattern[]>(initialState);

// 	return {
// 		subscribe,
// 		add: () =>
// 			update((p) => {
// 				// find first empty slot in the array
// 				const empty = p.findIndex((i) => i.active == false);

// 				// if none found, use the first slot, else use the one we found
// 				if (empty == -1) {
// 					p[empty + 1].active = true;
// 				} else {
// 					p[empty].active = true;
// 				}

// 				return p;
// 			}),
// 		remove: (pattern: Pattern) =>
// 			update((p) => {
// 				p[pattern.index].active = false;
// 				return p;
// 			})
// 	};
// }
