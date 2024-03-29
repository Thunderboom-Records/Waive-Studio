import type { Arrangement } from '$lib/waive/audioEngine/arrangement'
import type { BarData } from '$lib/waive/audioEngine/barData';
import type { ListParameter, ValueParameter } from '$lib/waive/audioEngine/parameter';
import type { Sampler, SoundSource } from '$lib/waive/audioEngine/sampler';
import type { Solo, Gain, ToneAudioNode } from 'tone';
import type { Time } from 'tone/build/esm/core/type/Units';


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
    SOLO,
}

export type FX = {
    type: NodeType,
    node: ToneAudioNode | SoundSource,
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

export type FXParameter = (ValueParameter | ListParameter);

export type ChainType = (InstrumentType | DrumType);

export type Chain = (FX | Sampler)[];

export type SMControls = {
    solo: Solo,
    mute: Gain,
}

export type Bar = {
    active: boolean,
    barData: BarData,
};

export type NoteEvent = {
    time: Time,
    note: number,
    length: Time,
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

export type NoteConverter = (notes: number[][], threshold?: number) => NoteEvent[];
 
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