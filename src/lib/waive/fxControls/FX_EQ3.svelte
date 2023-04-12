<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<!-- EQ Controls -->
<div class="border-x-2 border-gray-800 flex flex-col w-full">
    <FxHeader>eq3</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
        <FxKnob>low</FxKnob>
        <FxKnob>mid</FxKnob>
        <FxKnob>high</FxKnob>
    </div>
</div>