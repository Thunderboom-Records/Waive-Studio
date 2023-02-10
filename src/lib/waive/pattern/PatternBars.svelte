<script lang="ts">
	let bars: number[] = [1, 2, 3, 4, 5];
</script>

<div class="flex flex-row space-x-1 bg-gray-900 p-1">
	{#each bars as bar}
		<div class="rounded-md w-12 h-24 bg-gray-800 my-2">
			{bar}
		</div>
	{/each}
</div>
