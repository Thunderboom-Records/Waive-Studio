import type { Arrangement } from '$lib/waive/audioEngine/arrangement'
import type { BarData } from '$lib/waive/audioEngine/barData';
import type { ToneAudioNode } from 'tone';

export enum InstrumentType {
    DRUMS,
    BASS,
    LEAD,
    MASTER,
};

export enum DrumType {
    KICK,
    SNARE,
    HIHAT,
    CLAP,
    TOM,
};

export type Instrument = {
    type: InstrumentType,
    color: string,
    apiPatternRequest: string,
    apiInstrumentName: string,
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
    callback: ((value: number) => void) | ((value: string) => void),
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
}

export type SynthCallback = (event: NoteEvent, time: number) => void;
 
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