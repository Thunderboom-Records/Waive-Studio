export enum InstrumentType {
    KICK,
    SNARE,
    HIHAT,
    BASS,
    LEAD
};

export type Instrument = {
    type: InstrumentType,
    color: string
};

export type Bar = {
    index: number,
    active: boolean,
    instrument: Instrument
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

export type PlayerCanvas = {
    canvas: Canvas,
    canvasColor: string;
    fillColor: string
};