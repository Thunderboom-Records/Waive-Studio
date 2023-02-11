export enum InstrumentType {
    KICK,
    SNARE,
    HIHAT,
    BASS,
    LEAD
}

export type Instrument = {
    type: InstrumentType,
    color: string
}
