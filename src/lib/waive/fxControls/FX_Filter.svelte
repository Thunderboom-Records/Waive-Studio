<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
    import FilterSelection from './FilterSelection.svelte';
</script>

<!-- Filter Controls -->
<div class="border-x-2 border-gray-800 flex flex-col w-full">
    <FxHeader>filter</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
        <FilterSelection />
        <FxKnob>frequency</FxKnob>
        <FxKnob>q</FxKnob>
    </div>
</div>