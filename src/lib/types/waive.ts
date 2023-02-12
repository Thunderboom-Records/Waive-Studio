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
