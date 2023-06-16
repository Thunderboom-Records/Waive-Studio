<script lang="ts">
	import { Transport } from 'tone';
	import { loopLength } from '../stores/stores';

	let bpm = 120;
	let swing = 0;
	let loopOptions = [
		{id: 0, name: "4", value: "4:0"},
		{id: 1, name: "2", value: "2:0"},
		{id: 2, name: "1", value: "1:0"},
		{id: 3, name: "1/2", value: "0:2"},
		{id: 4, name: "1/4", value: "0:1"},
		{id: 5, name: "1/8", value: "0:0:2"},
	];

	let loopSelection: string;

	$: bpm = Math.floor(Transport.bpm.value);
	function updateBPM(d: number){
		Transport.bpm.value = Math.max(30, Math.min(200, Transport.bpm.value + d));
	}

	$: swing = Math.floor(Transport.swing * 100);
	function updateSwing(d: number){
		Transport.swing = Math.max(0.0, Math.min(0.5, Transport.swing + d));
	}

	function scrollBPM(event: WheelEvent){
		event.preventDefault();
		updateBPM(-Math.sign(event.deltaY))
	}

	function scrollSwing(event: WheelEvent){
		event.preventDefault();
		updateSwing(-Math.sign(event.deltaY)/100)
	}
</script>

<!-- BPM -->
<div class="flex flex-row space-x-1 h-full">
	<div class="badge flex border-0 rounded-l-full bg-gray-800 h-full w-24" on:wheel={scrollBPM}>
		<p class="leading-10 h-full w-full text-center">
			{bpm} bpm
		</p>
	</div>
	<button class="btn btn-sm border-0 bg-gray-800 hover:bg-gray-500 h-full w-8 rounded-none leading-10" on:click={() => updateBPM(-1)}> - </button>
	<button class="btn btn-sm border-0 bg-gray-800 hover:bg-gray-500 h-full rounded-r-full w-8 leading-10" on:click={() => updateBPM(1)}> + </button>
</div>

<!-- Swing Controls -->
<div class="flex flex-row space-x-1 h-full">
	<div class="badge flex border-0 rounded-l-full  bg-gray-800 h-full w-24 " on:wheel={scrollSwing}>
		<p class="leading-10 h-full w-full text-center">
			{swing}% swing
		</p>
	</div>
	<button class="btn btn-sm border-0 bg-gray-800 hover:bg-gray-500 h-full w-8 rounded-none leading-10" on:click={() => updateSwing(-0.01)}> - </button>
	<button class="btn btn-sm border-0 bg-gray-800 hover:bg-gray-500 h-full rounded-r-full w-8 leading-10" on:click={() => updateSwing(0.01)}> + </button>
</div>

<!-- Loop Controls -->
<div class="flex flex-row space-x-1 h-full">
	<div class="badge border-0 flex rounded-l-full bg-gray-800 h-full w-20">
		<p class="leading-10 h-full w-full text-center">
			loop:
		</p>
	</div>
	<select 
		bind:value={loopSelection} on:change={() => loopLength.set(loopSelection)} 
		class="leading-10 select select-sm max-w-xs border-0 rounded-r-full text-center bg-gray-800 hover:bg-gray-500 cursor-pointer"
	>
		{#each loopOptions as option, i}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>