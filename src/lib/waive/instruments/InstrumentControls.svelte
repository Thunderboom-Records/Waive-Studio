<script lang="ts">
	import { NodeType, type DrumType, type FX, type InstrumentType } from "$lib/types/waive";
	import FxBox from "$lib/waive/fxControls/FX_Box.svelte";
	import { Sampler } from "$lib/waive/audioEngine/sampler";
	import ChainLabel from "../fxControls/ChainLabel.svelte";
	import SampleControls from "../sample/SampleControls.svelte";
    import { selectedChain } from "$lib/waive/stores/stores";
	import { FXChains } from "../audioEngine/fxChains";
    
    let selectedFX: FX[] | undefined;
    let name: InstrumentType | DrumType;

    selectedChain.subscribe(value =>{
        selectedFX = FXChains[value];
        name = value;
    });

</script>

<div class="flex flex-row w-full gap-2 p-2 h-full">
    {#if typeof selectedFX !== 'undefined'}
        <ChainLabel {name}></ChainLabel>
        {#each selectedFX as fx}
            {#key fx}
                {#if fx instanceof Sampler}
                    <SampleControls sampler={fx} sampleOptionsKey={name}/>                 
                {:else if fx.type === NodeType.SYNTH}
                    <FxBox {fx} />
                {:else}
                    <FxBox {fx} />
                {/if}
            {/key}
        {/each}
    {/if}
</div>