<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
    import DelaySelection from './DelaySelection.svelte';
</script>

<!-- Delay Controls -->
<div class="flex flex-col w-full">
    <FxHeader>delay</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
        <FxKnob>feedback</FxKnob>
        <DelaySelection />
    </div>
</div>