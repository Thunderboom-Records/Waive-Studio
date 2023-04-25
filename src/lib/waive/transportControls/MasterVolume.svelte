<script lang="ts">
    import { masterGain } from "../audioEngine/fxChains";

    let value: number = 80;

    function onInput(e: any){
        masterGain.gain.rampTo(value / 100);
    }

</script>

<!-- TODO: Style Slider -->

<div class="flex flex-row items-center text-white space-x-3">
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        version="1.0"
        viewBox="0 0 75 75"
        class="w-6 h-6"
        fill="currentColor"
    >
    <!-- Volume Icon -->
        <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" />
        <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" />
    </svg>
    <input bind:value={value} on:input={onInput} type="range" class="w-24 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer">
</div>
