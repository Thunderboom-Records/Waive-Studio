<script lang="ts">
    import type { ChainType } from '$lib/types/waive';
    import { selectedChain } from '../stores/stores';

    export let key: ChainType;

    let active = false;
    selectedChain.subscribe(value => {
        active = value == key;
    });

</script>

<button 
    on:click={()=>{selectedChain.set(key)}}
    class="flex justify-evenly items-center border-0 hover:bg-gray-500 btn btn-sm rounded-full w-24
            max-h-8 h-full text-sm text-gray-400 leading-10 capitalize {active ? 'bg-gray-600' : 'bg-gray-800'}"
>
    <slot/>
</button>
