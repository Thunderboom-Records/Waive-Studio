
<!-- Col 1: PatternHeader -->
<div class="bg-gray-900 col-start-1">
	<h2 class="text-gray-400 text-center">clips</h2>
</div>

<!-- Col 2: SampleHeader-->
<div class="bg-gray-900 col-start-2">
	<h2 class="text-gray-400 text-center">controls</h2>
</div>

<!-- Col 3-6: PlayerHeader -->
{#each [1, 2, 3, 4] as barNumber}
	<div class="bg-gray-900 col-start-{2+barNumber} row-start-1">
		<span class="text-white text-xs text-center ml-2">{barNumber}</span>
	</div>
{/each}

<!-- Col 7: Placeholder-->
<div class="bg-gray-900 col-start-7" />
