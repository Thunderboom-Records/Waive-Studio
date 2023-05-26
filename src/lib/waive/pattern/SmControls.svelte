<script lang="ts">
	import * as Tone from 'tone';
	import VuMeter from '../instruments/VUMeter.svelte';
	import SmToggle from './SmToggle.svelte';

	export let channelNode: Tone.Channel;

	const node = new Tone.Meter();
	channelNode.connect(node);

	function solo(e: CustomEvent){
		channelNode.solo = e.detail;
	}

	function mute(e: CustomEvent){
		channelNode.mute = e.detail;
	}

</script>

<div class="grid w-full h-full grid-rows-2 grid-cols-2 gap-y-1">
	<div class="row-span-2">
		<VuMeter {node}/>
	</div>
	<div class="flex flex-col justify-between items-center space-y-4">
		<SmToggle color={"orange"} on:toggled={solo}>S</SmToggle>
		<SmToggle color={"red"} on:toggled={mute}>M</SmToggle>
	</div>
</div>
