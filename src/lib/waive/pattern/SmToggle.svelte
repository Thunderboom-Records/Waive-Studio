<script lang="ts">
	export let color: string;
	export let active: boolean = false;

	function toggle() {
		active = !active;
	}
</script>

{#if !active}
	<button on:click={toggle} class="btn btn-xs h-16 w-full bg-gray-900 text-xs">
		<slot />
	</button>
{:else}
	<button on:click={toggle} class="bg-gray-900 text-{color}-600 btn btn-xs h-16 w-full text-xs">
		<slot />
	</button>
{/if}
