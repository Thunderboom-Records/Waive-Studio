import { ChannelType, type Channel, type MasterChannel } from '$lib/types/waive';
import { writable, type Writable } from 'svelte/store';
import { arrangementStore } from './arrangement';
import { effectStore } from './effects';
import { patternStore } from './patterns';
import { signature } from './signature';


const kickInitialState: Channel = {
    name: 'kick',
	type: ChannelType.KICK,
	color: { name: 'red', 500: '#d14132', 600: '#601c13' },
	effects: effectStore().initial(),
	patterns: patternStore(),
	arrangement: arrangementStore(),
};



function kickStore(){
	const { subscribe, set, update } = writable<Channel>(kickInitialState);

	return {
		subscribe,
		set,
		update,
		initial: () => {
            return kickInitialState
        },
	}
}
const snareInitialState: Channel = {
	name: 'snare',
	type: ChannelType.SNARE,
	color: { name: 'blue', 500: '#3484d0', 600: '#273e60' },
	effects: effectStore().initial(),
	patterns: patternStore(),
	arrangement: arrangementStore(),
};

function snareStore(){
	const { subscribe, set, update } = writable<Channel>(snareInitialState);

	return {
		subscribe,
		set,
		update,
        initial: () => {
            return snareInitialState
        },
	}
};

const hihatInitialState: Channel = {
	name: 'hihat',
	type: ChannelType.HIHAT,
	color: { name: 'purple', 500: '#9352c7', 600: '#632b8d' },
	effects: effectStore().initial(),
	patterns: patternStore(),
	arrangement: arrangementStore(),
};

function hihatStore(){
	const { subscribe, set, update } = writable<Channel>(hihatInitialState);

	return {
		subscribe,
		set,
		update,
        initial: () => {
            return hihatInitialState
        },
	}
};

const bassInitialState: Channel = {
	name: 'bass',
	type: ChannelType.BASS,
	color: { name: 'orange', 500: '#eb7130', 600: '#83371c' },
	effects: effectStore().initial(),
	patterns: patternStore(),
	arrangement: arrangementStore(),
};

function bassStore(){
	const { subscribe, set, update } = writable<Channel>(bassInitialState);

	return {
		subscribe,
		set,
		update,
        initial: () => {
            return bassInitialState
        },
	}
};

const leadInitialState: Channel = {
	name: 'lead',
	type: ChannelType.LEAD,
	color: { name: 'green', 500: '#54ba84', 600: '#326e52' },
	effects: effectStore().initial(),
	patterns: patternStore(),
	arrangement: arrangementStore(),
};

function leadStore(){
	const { subscribe, set, update } = writable<Channel>(leadInitialState);

	return {
		subscribe,
		set,
		update,
        initial: () => {
            return leadInitialState
        },
	}
};

const kick = kickStore();
const snare = snareStore();
const hihat = hihatStore();
const bass = bassStore();
const lead = leadStore();

const masterInitialState: MasterChannel = {
    name: ChannelType.MASTER.toString(),
	type: ChannelType.MASTER,
    channels: [
		kick.initial(),
		snare.initial(),
		hihat.initial(),
		bass.initial(),
		lead.initial()
	],
    effects: [],
    arrangement: { arrangements: [] },
    signature: signature.initial()
};

function masterStore(){
	const { subscribe, set, update } = writable<MasterChannel>(masterInitialState);

	return {
		subscribe,
		set,
		update
	}
}

const master = masterStore();

export { master, kick, snare, hihat, bass, lead };