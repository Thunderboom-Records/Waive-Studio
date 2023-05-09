<script lang="ts">
    import type { ChainType } from '$lib/types/waive';
    import { selectedChain } from '../stores/stores';

    export let key: ChainType;

    let active: boolean = false;
    selectedChain.subscribe(value => {
        active = value == key;
    });

</script>

<button 
    on:click={()=>{selectedChain.set(key)}}
    class="hover:bg-gray-500 btn rounded-full w-20 max-h-8 h-full text-sm text-gray-400 {active ? 'bg-gray-600' : 'bg-gray-800'}"
>
    <slot/>
</button>
