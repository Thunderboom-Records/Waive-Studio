<script lang="ts">
	let loopBar = 4;
</script>

<!-- Col 1: Placeholder -->
<div class="bg-gray-900" />

<!-- Col 2: PatternHeader -->
<div class="bg-gray-900">
	<h2 class="text-gray-400 text-center">pattern</h2>
</div>

<!-- Col 3: SampleHeader-->
<div class="bg-gray-900">
	<h2 class="text-gray-400 text-center">controls</h2>
</div>

<!-- Col 4-7: PlayerHeader -->
{#each [1, 2, 3, 4] as barNumber}
	<div class="bg-gray-900">
		{#if barNumber <= loopBar}
			<span class="text-white text-xs text-center">{barNumber}</span>
		{:else}
			<span class="text-gray-600 text-xs text-center">{barNumber}</span>
		{/if}
	</div>
{/each}

<!-- Col 8: Placeholder-->
<div class="bg-gray-900" />
