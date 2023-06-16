<script lang="ts">
    import { renderWaveform } from "$lib/scripts/renderWaveform";
	import { onMount } from "svelte";

    export let waveform: Float32Array | undefined;
    let canvas: HTMLCanvasElement;

    $: _ = renderWaveform(canvas, waveform);

    onMount(() => {
        canvas.height = canvas.offsetHeight * 2;
        canvas.width = canvas.offsetWidth * 2;
    })

</script>

<canvas bind:this={canvas} class="w-full h-8 bg-gray-600 rounded max-w-[20rem] " />