<!-- Col 1: Placeholder -->
<div class="bg-gray-900 col-start-1" />

<!-- Col 2: PatternHeader -->
<div class="bg-gray-900 col-start-2">
	<h2 class="text-gray-400 text-center">pattern</h2>
</div>

<!-- Col 3: SampleHeader-->
<div class="bg-gray-900 col-start-3">
	<h2 class="text-gray-400 text-center">controls</h2>
</div>

<!-- Col 4-7: PlayerHeader -->
{#each [1, 2, 3, 4] as barNumber}
	<div class="bg-gray-900 col-start-{3+barNumber} row-start-1">
		<span class="text-white text-xs text-center ml-2">{barNumber}</span>
	</div>
{/each}

<!-- Col 8: Placeholder-->
<div class="bg-gray-900 col-start-8" />
