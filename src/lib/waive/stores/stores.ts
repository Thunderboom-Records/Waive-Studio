import { DrumType, InstrumentType } from '$lib/types/waive';
import { writable, type Writable } from 'svelte/store';

export let selectedChain: Writable<InstrumentType | DrumType> = writable(InstrumentType.MASTER);