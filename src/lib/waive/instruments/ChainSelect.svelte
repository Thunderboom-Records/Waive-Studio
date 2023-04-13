<script lang="ts">
    import type { DrumType, InstrumentType } from '$lib/types/waive';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let key: InstrumentType | DrumType;
</script>

<button 
    on:click={()=>{dispatch('switch', {key: key})}} 
    class="bg-gray-600 hover:bg-gray-500 btn rounded-full w-20 h-8 text-sm text-gray-400"
>
    <slot/>
</button>
