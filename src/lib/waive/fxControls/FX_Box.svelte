<script lang="ts">
    import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
    import { FXParameterType, type FX } from '$lib/types/waive';
	import FxSelection from './FXSelection.svelte';

    export let fx: FX;
</script>

<div class="bg-gray-700 flex flex-col p-1 rounded-lg">
    <FxHeader {fx}>{fx.label}</FxHeader>
    <div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
        {#each fx.parameters as parameter}
            {#if parameter.type == FXParameterType.VALUE}
                <FxKnob>{parameter.name}</FxKnob>
            {:else if parameter.type == FXParameterType.LIST}
                <FxSelection {parameter} />
            {/if}
        {/each}
    </div>
</div>