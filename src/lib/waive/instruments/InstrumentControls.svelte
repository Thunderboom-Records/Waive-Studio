<script lang="ts">
	import type { DrumType, FX, InstrumentType } from "$lib/types/waive";
	import FxBox from "$lib/waive/fxControls/FX_Box.svelte";
	import ChainLabel from "../fxControls/ChainLabel.svelte";
    
    export let selectedFX: FX[] | undefined;
    export let selectedChain: InstrumentType | DrumType;

</script>

<div class="flex flex-row gap-2 p-2">
    {#if typeof(selectedFX) !== 'undefined'}
        <ChainLabel>{selectedChain}</ChainLabel>
        {#each selectedFX as fx}
            {#key fx}
                <FxBox {fx} />
            {/key}
        {/each}
    {/if}
</div>