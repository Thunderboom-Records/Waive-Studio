<script lang="ts">
	import type { SoundSource } from "../audioEngine/sampler";

    export let onTime: number = 100;
    export let sampler: SoundSource | undefined = undefined;
    
    let active = false;
    let timeout: number;

    export function trigger(){
        if(timeout){
            window.clearTimeout(timeout);
        }

        active = true;
        timeout = window.setTimeout(() => {active = false}, onTime)
    }

    if(typeof sampler !== 'undefined'){
        sampler.addCallback((note) => trigger());
    }
</script>

<svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="{active ? 'orange' : 'lightgray'}"
    class="w-4 h-4 inline"
>
    <circle cx="12" cy="12" r="8" />
</svg>