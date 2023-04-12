<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<!-- Reverb Controls -->
<div class="border-x-2 border-gray-800 flex flex-col w-full">
    <FxHeader>reverb</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
        <FxKnob>decay</FxKnob>
        <FxKnob>wet</FxKnob>
    </div>
</div>