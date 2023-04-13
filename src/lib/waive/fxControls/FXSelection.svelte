<script lang="ts">
    import type { FXParameter } from "$lib/types/waive";

    export let parameter: FXParameter;

    let selected: string = parameter.value as string;

    function update(){
        if(typeof(parameter.callback) !== 'undefined'){
            parameter.callback(selected);
            parameter.value = selected;
        }
    }

</script>

 <select bind:value={selected} on:change={update} class="select max-w-xs rounded-full text-center bg-gray-400 h-6 px-4"> -->
	{#if typeof(parameter.options) === 'undefined'}
        <option disabled>---</option>
    {:else}
        {#each parameter.options as option}
            <!-- {#if option === parameter.value}
                <option selected value={option}>{option}</option>
            {:else} -->
                <option value={option}>{option}</option>
            <!-- {/if} -->
        {/each}
    {/if}
</select>