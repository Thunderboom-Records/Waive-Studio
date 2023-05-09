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
	<button on:click={toggle} class="bg-gray-900 w-full btn btn-xs text-xs">
		<slot />
	</button>
{:else}
	<button on:click={toggle} class="bg-{color}-900 text-{color}-600 w-full btn btn-xs text-xs">
		<slot />
	</button>
{/if}
