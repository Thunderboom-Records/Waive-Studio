import { Player, ToneAudioBuffer, Gain, ToneAudioNode } from "tone"


class DrumInstrument {
    drumBuffer: ToneAudioBuffer;
    drumPlayer: Player;
    drumVelocity: Gain;

    constructor(){
        this.drumBuffer = new ToneAudioBuffer();
        this.drumPlayer = new Player();
        this.drumVelocity = new Gain();

        this.drumPlayer.connect(this.drumVelocity);
    }

    connect(node: ToneAudioNode){
        this.drumVelocity.connect(node);
    }
}


export class DrumMachine {
    
    drumInstruments: Partial<Record<string, DrumInstrument>>;
    
    constructor(){
        this.drumInstruments = {};
    }

    addInstrument(name: string){
        this.drumInstruments[name] = new DrumInstrument();
    }

    connect(name: string, node: ToneAudioNode){
        this.drumInstruments[name]!.connect(node);
    }
}

export class BassSynth {
    
}