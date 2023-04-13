<script lang="ts">
	import type { FX, InstrumentType, DrumType } from "$lib/types/waive";
	import FxBox from "$lib/waive/fxControls/FX_Box.svelte";
	import { Sampler } from "$lib/waive/audioEngine/sampler";
	import ChainLabel from "../fxControls/ChainLabel.svelte";
	import SampleControls from "../sample/SampleControls.svelte";
    
    export let selectedFX: FX[] | undefined;
    export let selectedChain: InstrumentType | DrumType;

</script>

<div class="flex flex-row gap-2 p-2">
    {#if typeof(selectedFX) !== 'undefined'}
        <ChainLabel>{selectedChain}</ChainLabel>
        {#each selectedFX as fx}
            {#key fx}
                {#if fx instanceof Sampler}
                    <SampleControls sampler={fx}/>                 
                <!-- {:else if fx.type === NodeType.SYNTH}
                    <FxBox {fx} /> -->
                {:else}
                    <FxBox {fx} />
                {/if}
            {/key}
        {/each}
    {/if}
</div>