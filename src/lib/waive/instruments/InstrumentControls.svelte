<script lang="ts">
	import type { FX } from "$lib/types/waive";
	import FxBox from "../fxControls/FX_Box.svelte";
    
    export let selectedFX: FX[];

</script>

<div class="flex flex-row gap-2 p-2">
    {#each selectedFX as fx}
        <FxBox {fx} />
    {/each}
</div>