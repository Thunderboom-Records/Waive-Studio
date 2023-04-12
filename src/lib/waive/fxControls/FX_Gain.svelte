<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<!-- Gain Controls -->
<div class="border-x-2 border-gray-800 flex flex-col w-full">
    <FxHeader>gain</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
        <FxKnob>gain</FxKnob>
    </div>
</div>