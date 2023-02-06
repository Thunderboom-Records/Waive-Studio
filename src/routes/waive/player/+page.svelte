<script lang="ts">
	import { Instrument } from '$lib/types/waive';
	import MainControls from '$lib/waive/main-controls/MainControls.svelte';
	import Player from '$lib/waive/player/Player.svelte';
	import Selected from '$lib/waive/Selected.svelte';

	let selected: Instrument = Instrument.HIHAT;
</script>

<div class="flex flex-row bg-gray-900 border border-white p-1 space-x-4">
	<section class="w-2/3 flex flex-col border border-green-400 ">
		<div class="justify-center">
			<MainControls />
		</div>
		<div>
			<Player />
		</div>
	</section>

	<section class="w-1/3 flex flex-col border border-blue-400">
		<Selected {selected} />
	</section>
</div>
