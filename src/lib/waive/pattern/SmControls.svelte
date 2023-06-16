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

<div class="flex justify-between w-full h-full grid-rows-2 grid-cols-2  gap-y-1 bg-gray-900 p-1">
	<div class="row-span-2 h-full">
		<VuMeter {node}/>
	</div>
	<div class="flex flex-col justify-center items-center space-y-4 h-full">
		<SmToggle color={"orange"} on:toggled={solo}>S</SmToggle>
		<SmToggle color={"red"} on:toggled={mute}>M</SmToggle>
	</div>
</div>
