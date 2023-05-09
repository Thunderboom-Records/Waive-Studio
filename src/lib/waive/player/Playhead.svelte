<script lang="ts">
    import * as Tone from 'tone';
	import { loopLength } from '../stores/stores';
	import { onMount } from 'svelte';

    let cursor: HTMLDivElement;
    let loopRegion: HTMLDivElement;
    let loopIndicator: HTMLDivElement;

    onMount(() => {
        loopLength.subscribe(value => {
            const fullTicks = Tone.Time("4:0").toTicks();
            const loopTicks = Tone.Time(value).toTicks();
    
            const p = loopTicks / fullTicks;
    
            loopRegion.style.width = (p * 100) + "%";
            loopIndicator.style.width = ((1-p) * 100) + "%";
        })
    })

    Tone.Transport.scheduleRepeat((time) => {
        Tone.Draw.schedule(() => {
            const p = Tone.Transport.progress;
            cursor.style.left = (p*100) + "%";
        }, time)
    }, "64n")

</script>

<div class="col-start-3 col-end-7 row-start-1 row-end-5
                relative z-10 bg-opacity-10 pointer-events-none">
    <div bind:this={loopIndicator} class="bg-black bg-opacity-50 w-3/4 h-full absolute right-0"></div>
    <div bind:this={loopRegion} class="bg-opacity-10 w-1/2 h-full relative">
        <div bind:this={cursor} class="bg-orange-500 h-full w-1 p-0 absolute" />
    </div>
</div>