export enum InstrumentType {
    KICK,
    SNARE,
    HIHAT,
    BASS,
    LEAD
};

export type Instrument = {
    type: InstrumentType,
    color: Color
};

export type Bar = {
    index: number,
    active: boolean,
    instrument: Instrument
};

export type Pattern = {
    index: number,
    active: boolean,
};
 
export type Color = {
    name: string,
    500: string,
    600: string,
};

// Canvas Types

export type Canvas = {
    w: number,
    h: number
};

export type Rectangle = {
    x: number, 
    y: number, 
    w: number, 
    h: number
};

export type Sample = {
    name: string,
    active: boolean,
    index: number
};

export type PlayerCanvas = {
    canvas: Canvas,
    sample: Sample,
    color: string,
    fill: string,
};