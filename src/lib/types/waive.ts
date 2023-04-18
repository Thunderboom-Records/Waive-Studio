import type { Arrangement } from '$lib/waive/audioEngine/arrangement'
import type { BarData } from '$lib/waive/audioEngine/barData';
import type { ToneAudioNode } from 'tone';


export enum InstrumentType {
    DRUMS = "DRUMS",
    BASS = "BASS",
    LEAD = "LEAD",
    MASTER = "MASTER",
};

export enum DrumType {
    KICK = "KICK",
    SNARE = "SNARE",
    HIHAT = "HIHAT",
    CLAP = "CLAP",
    TOM = "TOM",
};

export let apiInstrumentNames: Record<string, string> = {};
apiInstrumentNames[DrumType.KICK] = "00_KD";
apiInstrumentNames[DrumType.SNARE] = "01_SD";
apiInstrumentNames[DrumType.HIHAT] = "02_HH";
apiInstrumentNames[DrumType.CLAP] = "03_CL";
apiInstrumentNames[DrumType.TOM] = "06_TH";

export type Instrument = {
    type: InstrumentType,
    color: string,
    apiPatternRequest: string,
    arrangement: Arrangement,
};

export enum NodeType {
    SAMPLER,
    SYNTH,
    GAIN,
    EQ3,
    CHANNEL,
    METER,
    DELAY,
    REVERB,
    COMPRESSOR,
    FILTER,
    PHASER,
    LIMITER,
}

export type FX = {
    type: NodeType,
    node: ToneAudioNode,
    label: string,
    bypassable: boolean,
    enabled: boolean,
    parameters: FXParameter[],
}

export enum FXParameterType {
    TOGGLE,
    LIST,
    VALUE,
}

export type FXParameter = {
    name: string,
    value: number | string,
    type: FXParameterType,
    range?: number[],
    exponential?: boolean,
    options?: string[],
    callback?: ((value: any) => void),
}

export type Bar = {
    active: boolean,
    barData: BarData,
};

export type NoteEvent = {
    time: string,
    note: number,
    length: string,
    velocity: number,
    fn?: string,
}

export type Sample = {
    url: string,
    source: string,
    name: string,
    z: number[],
}

export type SynthCallback = (event: NoteEvent, time: number) => void;
 
export type UndoableAction = {
    name: string,
    description: string,
    action: () => void,
    undo: () => void,
}


// Canvas Types
export enum CanvasType {
    DRUM,
    MELODY,
}

export type Canvas = {
    w: number,
    h: number,
};

export type Rectangle = {
    x: number, 
    y: number, 
    w: number, 
    h: number,
};

export type PlayerCanvas = {
    canvas: Canvas,
    canvasColor: string;
    fillColor: string,
};