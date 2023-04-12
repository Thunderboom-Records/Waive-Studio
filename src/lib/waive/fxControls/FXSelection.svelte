<script lang="ts">
    import type { FXParameter } from "$lib/types/waive";

    export let parameter: FXParameter;

    let selected: string;

    function update(){
        if(typeof(parameter.callback) !== 'undefined'){
            parameter.callback(selected);
        }
    }
</script>

 <select bind:value={selected} on:change={update} class="select max-w-xs rounded-full text-center bg-gray-400 h-6 px-4"> -->
	{#if typeof(parameter.options) === 'undefined'}
        <option disabled selected>---</option>
    {:else}
        {#each parameter.options as option}
            {#if option == parameter.value}
                <option value={option} selected>{option}</option>
            {:else}
                <option value={option}>{option}</option>
            {/if}
        {/each}
    {/if}
</select>