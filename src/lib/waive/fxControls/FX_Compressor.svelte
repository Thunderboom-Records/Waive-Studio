<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<!-- Compressor Controls -->
<div class="border-x-2 border-gray-800 flex flex-col w-full">
    <FxHeader>compressor</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
        <FxKnob>attack</FxKnob>
        <FxKnob>release</FxKnob>
        <FxKnob>ratio</FxKnob>
        <FxKnob>threshold</FxKnob>
    </div>
</div>