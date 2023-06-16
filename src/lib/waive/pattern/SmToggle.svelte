<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let color: string;
	export let active: boolean = false;
	
	const dispatch = createEventDispatcher();

	function toggle() {
		active = !active;
		dispatch("toggled", active);
	}
</script>

{#if !active}
	<button
		on:click={toggle}
		class="border-0 hover:bg-gray-600 btn btn-sm w-[0.5rem] rounded-md
            max-h-8 h-full text-sm text-gray-400 leading-8 {active ? 'bg-gray-600' : 'bg-gray-800'}">
		<slot />
	</button>
{:else}
	<button
		on:click={toggle}
		class="border-0 hover:bg-gray-600 hover:text-gray-400 bg-{color}-500 text-{color}-600 btn btn-sm w-[0.5rem] rounded-md text-sm leading-8" >
		<slot />
	</button>
{/if}
