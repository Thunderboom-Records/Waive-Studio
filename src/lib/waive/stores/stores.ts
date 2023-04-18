import { DrumType, InstrumentType, type Sample } from '$lib/types/waive';
import { writable, type Writable } from 'svelte/store';
import type { Arrangement } from '../audioEngine/arrangement';

export let selectedChain: Writable<InstrumentType | DrumType> = writable(InstrumentType.MASTER);

export let sampleOptions: Partial<Record<InstrumentType | DrumType, Writable<Sample[]>>> = {
    "KICK": writable([]),
    "SNARE": writable([]),
    "HIHAT": writable([]),
    "CLAP": writable([]),
    "TOM": writable([]),
    "LEAD": writable([]),
};

export let arrangements: Record<string, Writable<Arrangement>> = {};