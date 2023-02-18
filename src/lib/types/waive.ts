export enum InstrumentType {
    KICK,
    SNARE,
    HIHAT,
    BASS,
    LEAD,
};

export type Instrument = {
    type: InstrumentType,
    color: string,
};

export enum FXType {
    GAIN,
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
    type: FXType,
    label: string,
    bypassable: boolean,
    parameters: FXParameter[],
}

export enum FXParameterType {
    TOGGLE,
    LIST,
    VALUE,
}

export type FXParameter = {
    name: string,
    value: number,
    type: FXParameterType,
    callback: (value: number) => {},
}

export type Bar = {
    index: number,
    active: boolean,
    instrument: Instrument,
};

export type NoteEvent = {
    time: string,
    note: number,
    length: string,
    velocity: number,
    fn?: string,
}

export type SynthCallback = (event: NoteEvent, time: number) => void;
 
// Canvas Types

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