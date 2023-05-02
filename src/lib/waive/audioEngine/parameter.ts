import { clamp } from "$lib/scripts/utils";
import { FXParameterType } from "$lib/types/waive";
import type { ToneAudioNode } from "tone";

export class ValueParameter {
    value: number;
    name: string;
    range: number[];
    node: ToneAudioNode;
    type: FXParameterType = FXParameterType.VALUE;
    
    constructor(name: string, value: number = 0, min: number, max: number, node: ToneAudioNode){
        this.name = name;
        this.range = [min, max];
        this.node = node;
        this.value = clamp(value, this.range[0], this.range[1])
    }

    set(value: number){
        this.value = clamp(value, this.range[0], this.range[1]);
        let newVal: Record<string, number> = {};
        newVal[this.name] = this.value;
        this.node.set(newVal)
    }
}

export class ListParameter {
    name: string;
    value: string;
    options: string[];
    node: ToneAudioNode;
    type: FXParameterType = FXParameterType.LIST;

    constructor(name: string, value: string, options: string[], node: ToneAudioNode){
        this.name = name;
        this.value = value;
        this.options = options;
        this.node = node;
    }

    set(value: string){
        if(!this.options.includes(value)){
            return;
        }
        this.value = value;
        let newVal: Record<string, string> = {}
        newVal[this.name] = value;
        this.node.set(newVal);
    }
}