<script lang="ts">
	let bpm = 120;
	let rythm = {
		base: 4,
		over: 4
	};
</script>

<!-- BPM -->
<div class="flex flex-row place-items-center justify-center space-x-1">
	<span class="badge h-6  w-24 rounded-l-full bg-gray-800">{bpm} bpm</span>

	<div class="h-6 w-12 rounded-r-full bg-gray-800">
		<button class="btn btn-sm"> - </button>
		<button class="btn btn-sm"> + </button>
	</div>
</div>

<!-- Rythm -->
<div class="flex flex-row items-center space-x-1">
	<span class="badge h-6 w-24 rounded-l-full bg-gray-800">{rythm.base}/{rythm.over}</span>

	<div class="h-6 w-12 rounded-r-full bg-gray-800">
		<button class="btn-sm"> - </button>
		<button class="btn-sm"> + </button>
	</div>
</div>
