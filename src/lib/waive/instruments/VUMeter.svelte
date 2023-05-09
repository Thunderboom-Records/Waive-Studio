<script lang="ts">
	import { onMount } from "svelte";
	import type { ToneAudioNode } from "tone";
	import * as Tone from 'tone';

    export let node: ToneAudioNode | undefined;

    let indicator: HTMLDivElement;
    let meter = new Tone.Meter({normalRange: true, smoothing: 0.95});

    if(typeof node !== 'undefined'){
        node.connect(meter);
    }

    onMount(() => {

        function show(){
            let value = meter.getValue();
            let p: number = Array.isArray(value) ? value[0] * 100 : value * 100;

            indicator.style.height = p + "%";
            requestAnimationFrame(show);
        }

        requestAnimationFrame(show);
    })

</script>

<div class="w-6 h-full bg-gray-900 relative">
    <div bind:this={indicator} class="bg-gray-500 absolute bottom-0 w-full"/>
</div>