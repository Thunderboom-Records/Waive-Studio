<script lang="ts">
	import type { Instrument } from '$lib/types/waive';

	export let instrument: Instrument;
	let bars: number[] = [1, 2, 3, 4, 5];
</script>

<div class="flex flex-row space-x-1 bg-gray-900 p-1">
	{#each bars as bar}
		<div class="rounded-md w-12 h-24 bg-gray-800 my-2">
			{bar}
		</div>
	{/each}
</div>

<!-- <p class="bg-red-500 text-red-600">color placeholder</p>

<p class="bg-orange-500 text-orange-600">color placeholder</p>

<p class="bg-purple-500 text-purple-600">color placeholder</p>

<p class="bg-green-500 text-green-600">color placeholder</p>

<p class="bg-blue-500 text-blue-600">color placeholder</p> -->
