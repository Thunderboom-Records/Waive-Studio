<script lang="ts">
	let bpm = 120;
	let rythm = {
		base: 4,
		over: 4
	};

	import { Transport } from 'tone';

	$: Transport.bpm.value = bpm;
	function updateBPM(d: number){
		bpm += d;
	}
</script>

<!-- BPM -->
<div class="flex flex-row space-x-1 justify-center place-items-center">
	<span class="badge rounded-l-full  bg-gray-800 h-6 w-24">{bpm} bpm</span>

	<div class="bg-gray-800 rounded-r-full h-6 w-12">
		<button class="btn btn-sm" on:click={() => updateBPM(-1)}> - </button>
		<button class="btn btn-sm" on:click={() => updateBPM(1)}> + </button>
	</div>
</div>

<!-- Rythm -->
<div class="flex flex-row space-x-1 items-center">
	<span class="badge rounded-l-full bg-gray-800 h-6 w-24">{rythm.base}/{rythm.over}</span>

	<div class="bg-gray-800 rounded-r-full h-6 w-12">
		<button class="btn-sm"> - </button>
		<button class="btn-sm"> + </button>
	</div>
</div>
