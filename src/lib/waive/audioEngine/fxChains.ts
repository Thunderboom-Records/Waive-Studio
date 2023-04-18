import * as Tone from 'tone';
import { DrumType, FXParameterType, InstrumentType, NodeType, type FX, apiInstrumentNames } from "$lib/types/waive";
import type { ToneAudioNode } from 'tone';
import { BypassableFX } from './bypassableFX';
import { Sampler } from './sampler';



function createValueParameter(
    name: string, value: number, min: number, max: number, node: ToneAudioNode,
){
    
    let callback = (value: number) => {
        let valClamped = Math.max(min, Math.min(max, value));
        let newVal: Record<string, number> = {};
        newVal[name] = valClamped;
        node.set(newVal)
    }

    let parameter = {
        name: name,
        value: value,
        type: FXParameterType.VALUE,
        range: [min, max],
        callback: callback,
    }

    // set node to given value
    callback(value);

    return parameter;
}

function createListParameter(
    name: string, value: string, options: string[], node: ToneAudioNode,
){
    let callback = (value: string) => {
        let newVal: Record<string, string> = {}
        newVal[name] = value;
        node.set(newVal);
    }

    let parameter = {
        name: name,
        value: value,
        type: FXParameterType.LIST,
        options: options,
        callback: callback,
    }

    callback(value);
    return parameter;
}


function addFXChannel(){
    let node = new Tone.PanVol({pan: 0.0, volume: 0.0});

    let panParam = createValueParameter("pan", 0.0, -1.0, 1.0, node);
    let volParam = createValueParameter("vol", 0.0, -40, 5, node);

    return {
        type: NodeType.CHANNEL,
        node: node,
        bypassable: false,
        enabled: true,
        label: 'Channel',
        parameters: [panParam, volParam],
    };
}

function addFXEQ3(){
    let node = new Tone.EQ3({highFrequency: 2000, lowFrequency: 100});

    let lowParam = createValueParameter("low", 1.0, -24.0, 5.0, node);
    let midParam = createValueParameter("mid", 1.0, -24.0, 5.0, node);
    let highParam = createValueParameter("high", 1.0, -24.0, 5.0, node);

    return {
        type: NodeType.EQ3,
        node: node,
        bypassable: true,
        enabled: true,
        label: 'EQ3',
        parameters: [lowParam, midParam, highParam],
    };
}

function addFXFilter(){
    let node = new Tone.Filter({frequency: 2000, type: 'lowpass', Q: 1.0});

    let freqParam = createValueParameter("frequency", 2000, 20, 20000, node);
    let qParam = createValueParameter("Q", 1.0, 0.0, 4.0, node);
    let typeParam = createListParameter("type", "highpass", ["lowpass", "highpass", "bandpass"], node);

    return {
        type: NodeType.FILTER,
        node: node,
        bypassable: true,
        enabled: false,
        label: 'Filter',
        parameters: [freqParam, qParam, typeParam],
    }
}

function addFXReverb(){
    let node = new Tone.Reverb({decay: 1.0, wet: 0.7});
    
    let decayParam = createValueParameter("decay", 1.0, 0.0, 1.0, node);
    let wetParam = createValueParameter("wet", 0.0, 0.0, 1.0, node);

    return {
        type: NodeType.REVERB,
        node: node,
        bypassable: true,
        enabled: false,
        label: 'Reverb',
        parameters: [decayParam, wetParam],
    }
}

function addFXDelay(){
    let node = new Tone.FeedbackDelay({feedback: 0.0, delayTime: 0.2, wet: 0.5});

    let fbParam = createValueParameter("feedback", 0.0, 0.0, 1.0, node);
    let delayParam = createListParameter("delayTime", "16n", ["64n", "32n", "16n", "8n"], node);
    let wetParam = createValueParameter("wet", 0.3, 0.0, 1.0, node);

    return {
        type: NodeType.DELAY,
        node: node,
        bypassable: true,
        enabled: false,
        label: 'Delay',
        parameters: [fbParam, wetParam, delayParam],
    }
}

function addFXLimiter(){
    let node = new Tone.Limiter({threshold: -10.0});

    let thresholdParam = createValueParameter("threshold", -10.0, -40.0, 0.0, node);
    
    return {
        type: NodeType.LIMITER,
        node: node,
        bypassable: true,
        enabled: true,
        label: 'Limiter',
        parameters: [thresholdParam],
    }
}

function addFXCompressor(){
    let node: ToneAudioNode = new Tone.Compressor({attack: 0.01, release: 0.1, ratio: 3, threshold: -30});

    let attackParam = createValueParameter("attack", 0.01, 0.0, 0.3, node);
    let releaseParam = createValueParameter("release", 0.1, 0.0, 0.3, node);
    let ratioParam = createValueParameter("ratio", 3, 1, 10, node);
    let thresholdParam = createValueParameter("threshold", -30, -60, 0, node);

    return {
        type: NodeType.COMPRESSOR,
        node: node,
        bypassable: true,
        enabled: true,
        label: 'Compressor',
        parameters: [attackParam, releaseParam, ratioParam, thresholdParam],
    }
}

function addSynth(){
    let node = new Tone.MonoSynth({
        "portamento": 0.2,
        "oscillator": {
            "type": "sawtooth",
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.2,
            "sustain": 0.2,
            "release": 1.0,
        },
        "filterEnvelope": {
            "attack": 0.01,
            "decay": 0.2,
            "sustain": 0.2,
            "release": 1.0,
            "octaves": 3.0,
        },
        "filter": {
            "type": "lowpass",
            "Q": 1.0,
        }
    });

    return {
        type: NodeType.SYNTH,
        node: node,
        bypassable: false,
        enabled: true,
        label: 'MonoSynth',
        parameters: [],
    }
}

export function buildFXChain(chain: NodeType[], props?: any){
    let nodes: FX[] = [];
    for(let nodeType of chain){
        let node: FX;
        switch(nodeType){
            case NodeType.CHANNEL:
                node = addFXChannel();
                break
            case NodeType.EQ3:
                node = addFXEQ3()
                break
            case NodeType.DELAY:
                node = addFXDelay();
                break
            case NodeType.REVERB:
                node = addFXReverb();
                break
            case NodeType.FILTER:
                node = addFXFilter();
                break
            case NodeType.LIMITER:
                node = addFXLimiter();
                break
            case NodeType.COMPRESSOR:
                node = addFXCompressor();
                break
            case NodeType.SAMPLER:
                node = new Sampler();
                break
            case NodeType.SYNTH:
                node = addSynth();
                break
            default:
                console.log("unknown FX type: " + NodeType[nodeType]);
                continue;
        }

        if(node.bypassable){
            let bypassableNode = new BypassableFX(node.node, !node.enabled)
            node.node = bypassableNode;
        }
        nodes.push(node);
    }

    // Connect Audio Nodes in chain...
    for(let i = 0; i < nodes.length - 1; i++){
        nodes[i].node.connect(nodes[i+1].node)
    }

    return nodes;
}

const masterFXChain: FX[] = buildFXChain([
    NodeType.DELAY,
    NodeType.REVERB,
    NodeType.FILTER,
    NodeType.EQ3,
    NodeType.COMPRESSOR,
    NodeType.LIMITER,
    NodeType.CHANNEL,
]);

const bassFXChain: FX[] = buildFXChain([
    NodeType.SYNTH,
    NodeType.FILTER, 
    NodeType.DELAY,
    NodeType.CHANNEL,
]);

const leadFXChain: FX[] = buildFXChain([
    NodeType.SAMPLER,
    NodeType.FILTER, 
    NodeType.DELAY,
    NodeType.CHANNEL,
]);

const drumChannelFXChain: NodeType[] = [
    NodeType.SAMPLER,
    NodeType.EQ3, 
    NodeType.FILTER, 
    NodeType.REVERB,
    NodeType.CHANNEL,
];

const drumChannels = [
    DrumType.KICK,
    DrumType.SNARE,
    DrumType.HIHAT,
    DrumType.CLAP,
    DrumType.TOM,
];


export const FXChains: Partial<Record<InstrumentType|DrumType, (FX|Sampler)[]>> = {};
FXChains[InstrumentType.MASTER] = masterFXChain;
FXChains[InstrumentType.BASS] = bassFXChain;
FXChains[InstrumentType.LEAD] = leadFXChain;

for(let drumType of drumChannels){
    let drumChain = buildFXChain(drumChannelFXChain);
    if(drumChain[0] instanceof Sampler){
        drumChain[0].apiInstrumentName = apiInstrumentNames[drumType];
    }
    drumChain[drumChain.length - 1].node.connect(masterFXChain[0].node);
    FXChains[drumType] = drumChain;
}

bassFXChain[bassFXChain.length - 1].node.connect(masterFXChain[0].node);
leadFXChain[leadFXChain.length - 1].node.connect(masterFXChain[0].node);
masterFXChain[masterFXChain.length - 1].node.toDestination();