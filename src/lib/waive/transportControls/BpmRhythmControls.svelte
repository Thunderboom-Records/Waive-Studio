<script lang="ts">
	import { Transport } from 'tone';

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

	let loopEnd: string;

	$: bpm = Math.floor(Transport.bpm.value);
	function updateBPM(d: number){
		Transport.bpm.value = Math.max(30, Math.min(200, Transport.bpm.value + d));
	}

	$: swing = Math.floor(Transport.swing * 100);
	function updateSwing(d: number){
		Transport.swing = Math.max(0.0, Math.min(0.5, Transport.swing + d));
	}
</script>

<!-- BPM -->
<div class="flex flex-row space-x-1 justify-center place-items-center">
	<span class="badge flex place-items-center justify-center rounded-l-full bg-gray-800 h-8 w-24">{bpm} bpm</span>
	<div class="flex space-x-3 justify-center place-items-center bg-gray-800 rounded-r-full h-8 w-12">
		<button class="btn btn-sm" on:click={() => updateBPM(-1)}> - </button>
		<button class="btn btn-sm" on:click={() => updateBPM(1)}> + </button>
	</div>
</div>

<!-- Swing Controls -->
<div class="flex flex-row space-x-1 justify-center place-items-center">
	<span class="badge flex place-items-center justify-center rounded-l-full  bg-gray-800 h-8 w-24">{swing}% swing</span>
	<div class="flex space-x-3 justify-center place-items-center bg-gray-800 rounded-r-full h-8 w-12">
		<button class="btn btn-sm" on:click={() => updateSwing(-0.01)}> - </button>
		<button class="btn btn-sm" on:click={() => updateSwing(0.01)}> + </button>
	</div>
</div>

<!-- Loop Controls -->
<div class="flex flex-row space-x-1 justify-center place-items-center">
	<span class="badge flex place-items-center justify-center rounded-l-full  bg-gray-800 h-8 w-20">loop:</span>
	<select bind:value={loopEnd} on:change={() => Transport.loopEnd = loopEnd} class="select max-w-xs rounded-r-full text-center bg-gray-800 h-8">
		{#each loopOptions as option, i}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>