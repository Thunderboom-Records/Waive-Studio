<script lang="ts">
	import PlayerHeader from '../player/PlayerHeader.svelte';
</script>

<!-- Col 1: Placeholder -->
<div class="bg-gray-900 w-16" />

<!-- Col 2: PatternHeader -->
<div class="bg-gray-900 w-96">
	<h2 class="text-gray-300 text-center">pattern</h2>
</div>

<!-- Col 3: SampleHeader-->
<div class="bg-gray-900 w-72">
	<h2 class="text-gray-300 text-center">sample</h2>
</div>

<!-- Col 4-7: PlayerHeader -->
<PlayerHeader />

<!-- Col 8: Placeholder-->
<div class="bg-gray-900" />
