<script lang="ts">
    import type { DrumType, InstrumentType } from '$lib/types/waive';
    import { selectedChain } from '../stores/stores';

    export let key: InstrumentType | DrumType;

    let active: boolean = false;
    selectedChain.subscribe(value => {
        active = value == key;
    });

</script>

<button 
    on:click={()=>{selectedChain.set(key)}}
    class="hover:border btn rounded-full w-20 h-8 text-sm text-gray-400 {active ? 'bg-gray-500 border-none' : 'bg-gray-600'}"
>
    <slot/>
</button>
