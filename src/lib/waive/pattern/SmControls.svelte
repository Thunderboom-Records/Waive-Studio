<script lang="ts">
	import SmToggle from './SmToggle.svelte';

	export let color: string;
</script>

<div class="bg-gray-800 text-gray-500 text-sm space-y-1 w-full">
	<SmToggle {color}>S</SmToggle>
	<SmToggle {color}>M</SmToggle>
</div>
