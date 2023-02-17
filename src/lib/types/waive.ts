//#region Music Types

import type { PatternStore } from "$lib/waive/stores/patterns";
import type { Writable } from "svelte/store";

/**
 * A channel combines the different configurations into one music output.
 */
export type Channel = {
	name: string;
	type: ChannelType;
	color: Color;
    effects: Effect[]; // swap to writable
    patterns: PatternStore;
    arrangement: Writable<Arrangement>;
};

/**
 * The Master Channel combines all different channels into one.
 */
export type MasterChannel = {
    name: string;
    type: ChannelType.MASTER;
    channels: Channel[];
    effects: Effect[];
    arrangement: MasterArrangement;
    signature: Signature;
}

export type ChannelStore =  
    | KickStore
    | SnareStore
    | HihatStore
    | BassStore
    | LeadStore;

export type KickStore = Writable<Channel> & {
	initial(): void,
	add(): void
}

export type SnareStore = Writable<Channel> & {
	initial(): void,
	add(): void
}

export type HihatStore = Writable<Channel> & {
	initial(): void,
	add(): void
}

export type BassStore = Writable<Channel> & {
	initial(): void,
	add(): void
}

export type LeadStore = Writable<Channel> & {
	initial(): void,
	add(): void
}

/**
 * All possible channel types currently supported in Waive:
 * - MASTER
 * - KICK
 * - SNARE
 * - HIHAT
 * - BASS
 * - LEAD
 */
export enum ChannelType {
    MASTER,
	KICK,
	SNARE,
	HIHAT,
	BASS,
	LEAD
}

/** 
 * Way of grouping the notes:
 * Beats per Measure
 * Notes per Beat
 * Beats per Minute
 * */
export type Signature = {
    beatsPerMeasure: number;
    notesPerBeat: number;
    beatsPerMinute: number;
};

/**
 * A Measure is a collection of notes.
 * Notes are expressed as Rectangles to be drawn on the Canvas.
 */
export type Measure = {
    notes: Rectangle[];
};

/**
 * An Arrangement is a specifically ordered collection of Measures in a specific Channel.
 * It can contain up to 4 measures.
 */
export type Arrangement = {
    measures: Measure[];
};

/**
 * The Master Arrangement is the combination of all the Arrangements in the app.
 */
export type MasterArrangement = {
    arrangements: Arrangement[];
};


/**
 * A generated pattern containing:
 * Canvas: used to draw the pattern on
 * Measure: containing the generated notes
 * Complexity: amount of notes in the Pattern
 */
export type Pattern = {
    index: number;
    canvas: Canvas;
    measure: Measure;
    complexity: Complexity;
};

/**
 * The complexity of the generated pattern
 * Higher complexity == more notes per Pattern
 */
export type Complexity = {
    min: number;
    max: number;
    initial: number;
    current: number;
};

/**
 * A Sample is the Sound Input for a Pattern.
 * It's named based on the Archive Name of Beeld & Geluid.
 * It belongs to a specific Channel.
 */
export type Sample = {
	name: string;
    channel: Channel;
};

//#endregion

//#region Effects
export type Effect = 
    | DelayEffect
    | ReverbEffect
    | FilterEffect
    | EqEffect
    | GainEffect
    | LimiterEffect;

export type DelayEffect = {
	feedback: number;
	selectionOptions: string[];
	selected: string;
};

export type ReverbEffect = {
	decay: number;
	wet: number;
};

export type FilterEffect = {
	selectionOptions: string[];
	selected: string;
	frequency: number;
	q: number;
};

export type EqEffect = {
	low: number;
	mid: number;
	high: number;
};

export type CompressorEffect = {
	attack: number;
	release: number;
};

export type GainEffect = {
	gain: number;
};

export type LimiterEffect = {
	limiter: number;
};
//#endregion

//#region UI Types
export type Color = {
	name: string;
	500: string;
	600: string;
};

export type Canvas = {
	w: number;
	h: number;
    color: Color;
};

export type Rectangle = {
	x: number;
	y: number;
	w: number;
	h: number;
};

//#endregion