import * as Tone from 'tone';
import { assert } from 'tone/build/esm/core/util/Debug';

export class FXChain extends Tone.ToneAudioNode {
    name: string;
    input: Tone.InputNode | undefined;
    output: Tone.OutputNode | undefined;
    private _chain: Tone.ToneAudioNode[];

    constructor(...chain: Tone.ToneAudioNode[]){
        assert(chain.length > 0, "FXChain must be have at least one ToneAudioNode");
        super();
        this._chain = chain;
        this.input = chain.at(0)?.input;
        this.output = chain.at(-1)?.output;

        this.name = "FX Chain [" + chain.join(" > ") + "]";
    }

    connect(destination: Tone.InputNode, outputNum?: number | undefined, inputNum?: number | undefined): this {
        this._chain.at(-1)?.connect(destination, outputNum, inputNum)
        return this;
    }

    toDestination(): this {
        this._chain.at(-1)?.toDestination();
        return this;
    }

    chain(...nodes: Tone.InputNode[]): this {
        this._chain.at(-1)?.chain(...nodes)
        return this;
    }

    fan(...nodes: Tone.InputNode[]): this {
        this._chain.at(-1)?.fan(...nodes)
        return this;
    }
}