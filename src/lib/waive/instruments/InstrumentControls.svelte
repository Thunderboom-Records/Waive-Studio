<script lang="ts">
    import FxControls from '$lib/waive/fxControls/FxControls.svelte';
	import SampleControls from '$lib/waive/sample/SampleControls.svelte';
	import type { InstrumentType, Instrument, DrumType } from '$lib/types/waive';

    export let instruments: Instrument[];
    export let selectedChain: InstrumentType | DrumType;

</script>

<div class="grid grid-cols-4 w-full">
    {#each instruments as instrument}
        <!-- {#if instrument.type == selectedChain}
            <div class="grid-span-1">
                <SampleControls {instrument}/>
            </div>
            <div class="grid-span-3">
                <FxControls fxChain={instrument.fxChain} />
            </div>            
        {/if} -->
    {/each}
</div>