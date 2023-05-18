import * as Tone from 'tone';
import { DrumType, InstrumentType, NodeType, type FX, apiInstrumentNames, type ChainType, type Chain, type SMControls } from "$lib/types/waive";
import { BypassableFX } from './bypassableFX';
import { Sampler } from './sampler';
import { ValueParameter, ListParameter } from './parameter';
import { nearestTimeString } from '$lib/scripts/utils';
import { drumTypeMidiMap } from './barData';
import { BassSynth } from './synths';


const defaultProps: Partial<Record<NodeType, any>> = {};
defaultProps[NodeType.CHANNEL] = {pan: 0.0, volume: 0.0};
defaultProps[NodeType.COMPRESSOR] = {attack: 0.01, release: 0.1, ratio: 3, threshold: -30};
defaultProps[NodeType.DELAY] = {feedback: 0.0, delayTime: "8n", wet: 0.5};
defaultProps[NodeType.EQ3] = {highFrequency: 2000, lowFrequency: 100};
defaultProps[NodeType.FILTER] = {frequency: 2000, type: "lowpass", Q: 1.0};
defaultProps[NodeType.GAIN] = {};
defaultProps[NodeType.LIMITER] = {threshold: -10.0};
defaultProps[NodeType.REVERB] = {decay: 1.0, wet: 0.7};
defaultProps[NodeType.SAMPLER] = {
    ampEnv: {
        attack: 0.0, decay: 0.0, sustain: 1.0, release: 1.0
    },
    note: 48,
};
defaultProps[NodeType.SYNTH] = {
    portamento: 0.2,
    oscillator: {
        type: "sawtooth",
    },
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 1.0,
    },
    filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 1.0,
        octaves: 3.0,
    },
    filter: {
        type: "lowpass",
        Q: 1.0,
    }
}

const DELAY_OPTIONS = ["64n", "32n", "16n", "8n"];

const masterFXChain: NodeType[] = [
    NodeType.DELAY,
    NodeType.REVERB,
    NodeType.FILTER,
    NodeType.EQ3,
    NodeType.COMPRESSOR,
    NodeType.LIMITER,
    NodeType.CHANNEL,
];

const bassFXChain: NodeType[] = [
    NodeType.SYNTH,
    NodeType.FILTER, 
    NodeType.DELAY,
    NodeType.CHANNEL,
];

const leadFXChain: NodeType[] = [
    NodeType.SAMPLER,
    NodeType.FILTER, 
    NodeType.DELAY,
    NodeType.REVERB,
    NodeType.CHANNEL,
];

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


function addFXChannel(props?: any){
    const {enabled = true, bypassable = false, ...fxProps} = props;

    let node = new Tone.PanVol(fxProps);

    let panParam = new ValueParameter("pan", node.get().pan, -1.0, 1.0, node);
    let volParam = new ValueParameter("volume", node.get().volume, -40, 5, node);

    return {
        type: NodeType.CHANNEL,
        node: node,
        bypassable,
        enabled,
        label: 'Channel',
        parameters: [panParam, volParam],
    };
}

function addFXEQ3(props?: any){
    const {enabled = true, bypassable = true, ...fxProps} = props;

    let node = new Tone.EQ3(fxProps);

    let lowParam = new ValueParameter("low", node.get().low, -24.0, 5.0, node);
    let midParam = new ValueParameter("mid", node.get().mid, -24.0, 5.0, node);
    let highParam = new ValueParameter("high", node.get().high, -24.0, 5.0, node);

    return {
        type: NodeType.EQ3,
        node: node,
        bypassable,
        enabled,
        label: 'EQ3',
        parameters: [lowParam, midParam, highParam],
    };
}

function addFXFilter(props?: any){
    const {enabled = false, bypassable = true, ...fxProps} = props;

    let node = new Tone.Filter(fxProps);

    let freqParam = new ValueParameter("frequency", node.get().frequency as number, 20, 20000, node);
    let qParam = new ValueParameter("Q", node.get().Q, 0.0, 4.0, node);
    let typeParam = new ListParameter("type", node.get().type, ["lowpass", "highpass", "bandpass"], node);

    return {
        type: NodeType.FILTER,
        node: node,
        bypassable,
        enabled,
        label: 'Filter',
        parameters: [freqParam, qParam, typeParam],
    }
}

function addFXReverb(props?: any){
    const {enabled = false, bypassable = true, ...fxProps} = props;

    let node = new Tone.Reverb(fxProps);
    
    let decayParam = new ValueParameter("decay", node.get().decay, 0.0, 1.0, node);
    let wetParam = new ValueParameter("wet", node.get().wet, 0.0, 1.0, node);

    return {
        type: NodeType.REVERB,
        node: node,
        bypassable,
        enabled,
        label: 'Reverb',
        parameters: [decayParam, wetParam],
    }
}

function addFXDelay(props?: any){
    const {enabled = false, bypassable = true, ...fxProps} = props;

    let node = new Tone.FeedbackDelay(fxProps);

    let fbParam = new ValueParameter("feedback", node.get().feedback, 0.0, 1.0, node);
    let delayParam = new ListParameter("delayTime", nearestTimeString(node.get().delayTime, DELAY_OPTIONS), DELAY_OPTIONS, node);
    let wetParam = new ValueParameter("wet", node.get().wet, 0.0, 1.0, node);

    return {
        type: NodeType.DELAY,
        node: node,
        bypassable,
        enabled,
        label: 'Delay',
        parameters: [fbParam, wetParam, delayParam],
    }
}

function addFXLimiter(props?: any){
    const {enabled = true, bypassable = true, ...fxProps} = props;

    let node = new Tone.Limiter(fxProps);

    let thresholdParam = new ValueParameter("threshold", node.get().threshold, -40.0, 0.0, node);
    
    return {
        type: NodeType.LIMITER,
        node: node,
        bypassable,
        enabled,
        label: 'Limiter',
        parameters: [thresholdParam],
    }
}

function addFXCompressor(props?: any){
    const {enabled = true, bypassable = true, ...fxProps} = props;

    let node = new Tone.Compressor(fxProps);

    let attackParam = new ValueParameter("attack", node.get().attack as number, 0.0, 0.3, node);
    let releaseParam = new ValueParameter("release", node.get().release as number, 0.0, 0.3, node);
    let ratioParam = new ValueParameter("ratio", node.get().ratio, 1, 10, node);
    let thresholdParam = new ValueParameter("threshold", node.get().threshold, -60, 0, node);

    return {
        type: NodeType.COMPRESSOR,
        node: node,
        bypassable,
        enabled,
        label: 'Compressor',
        parameters: [attackParam, releaseParam, ratioParam, thresholdParam],
    }
}

function addSynth(props?: any){
    const {enabled = true, bypassable = false, ...fxProps} = props;

    let node = new BassSynth(fxProps);

    return {
        type: NodeType.SYNTH,
        node: node,
        bypassable,
        enabled,
        label: 'MonoSynth',
        parameters: [],
    }
}

export function buildFXChain(chain: NodeType[], context?: Tone.BaseContext, props?: any[]){
    let nodes: FX[] = [];
    
    for(let i = 0; i < chain.length; i++){
        const nodeType = chain[i];
        const nodeProps = {...defaultProps[nodeType], ...(props? props[i] : {})};
        
        if(typeof context !== 'undefined'){
            nodeProps.context = context;
        }
        
        let node: FX;
        switch(nodeType){
            case NodeType.CHANNEL:
                node = addFXChannel(nodeProps);
                break
            case NodeType.EQ3:
                node = addFXEQ3(nodeProps)
                break
            case NodeType.DELAY:
                node = addFXDelay(nodeProps);
                break
            case NodeType.REVERB:
                node = addFXReverb(nodeProps);
                break
            case NodeType.FILTER:
                node = addFXFilter(nodeProps);
                break
            case NodeType.LIMITER:
                node = addFXLimiter(nodeProps);
                break
            case NodeType.COMPRESSOR:
                node = addFXCompressor(nodeProps);
                break
            case NodeType.SAMPLER:
                node = new Sampler(context, nodeProps);
                break
            case NodeType.SYNTH:
                // node = addSynth(nodeProps);
                node = new BassSynth(context, nodeProps);
                break
            default:
                console.log("unknown FX type: " + NodeType[nodeType]);
                continue;
        }

        if(node.bypassable){
            let bypassableNode = new BypassableFX(node.node, !node.enabled);
            node.node = bypassableNode;
        }
        nodes.push(node);
    }

    for(let i = 0; i < nodes.length - 1; i++){
        nodes[i].node.connect(nodes[i+1].node)
    }

    return nodes;
}


export function buildWaiveAudioGraph(context?: Tone.BaseContext, props?: any){
    if(typeof context === 'undefined'){
        context = Tone.getContext();
    }

    const FXChains: Partial<Record<ChainType, Chain>> = {};
    const SMNodes: Partial<Record<InstrumentType, Tone.ToneAudioNode>> = {};

    const master = buildFXChain(masterFXChain, context, props?.MASTER);
    const bass = buildFXChain(bassFXChain, context, props?.BASS);
    const lead = buildFXChain(leadFXChain, context, props?.LEAD);
    if(lead[0] instanceof Sampler){
        lead[0].apiInstrumentName = "LEAD";
    }
    
    SMNodes[InstrumentType.BASS] = new Tone.Channel({context});
    bass.at(-1)?.node.connect(SMNodes[InstrumentType.BASS]);
    SMNodes[InstrumentType.LEAD] = new Tone.Channel({context});
    lead.at(-1)?.node.connect(SMNodes[InstrumentType.LEAD]);

    FXChains[InstrumentType.MASTER] = master;
    FXChains[InstrumentType.BASS] = bass;
    FXChains[InstrumentType.LEAD] = lead;
    
    SMNodes[InstrumentType.DRUMS] = new Tone.Channel({context});
    for(let drumType of drumChannels){
        let drumChain = buildFXChain(drumChannelFXChain, context, props ? props[drumType] : undefined);
        if(drumChain[0] instanceof Sampler){
            drumChain[0].apiInstrumentName = apiInstrumentNames[drumType];
            drumChain[0].note = drumTypeMidiMap[drumType];
        }
        drumChain.at(-1)?.node.connect(SMNodes[InstrumentType.DRUMS]);
        FXChains[drumType] = drumChain;
    }

    SMNodes[InstrumentType.BASS].connect(master[0].node);
    SMNodes[InstrumentType.LEAD].connect(master[0].node);
    SMNodes[InstrumentType.DRUMS].connect(master[0].node);

    SMNodes[InstrumentType.MASTER] = new Tone.Gain({context});
    master.at(-1)?.node.connect(SMNodes[InstrumentType.MASTER]);
    SMNodes[InstrumentType.MASTER].toDestination();

    return { FXChains, SMNodes }
}

export function getAudioGraphProps(FXChains: Partial<Record<ChainType, Chain>>){
    const props: Partial<Record<ChainType, any>> = {};

    let key: keyof typeof InstrumentType|DrumType;
    for(key in FXChains){
        const chain = FXChains[key];
        if(typeof chain === 'undefined'){
            continue;
        }
        let chainProp = [];
        for(let fx of chain){
            let prop: Record<string, any> = {};
            if(fx instanceof Sampler){
                prop.node = fx.node.get();
                prop.current = fx.current;
                prop.note = fx.note;

            } else {
                for(const param of fx.parameters){
                    prop[param.name] = param.value;
                }
                prop.enabled = fx.enabled;
                prop.bypassable = fx.bypassable;
            }
            chainProp.push(prop);
        }

        props[key] = chainProp;
    }

    return props;
}

export const { FXChains, SMNodes } = buildWaiveAudioGraph();
