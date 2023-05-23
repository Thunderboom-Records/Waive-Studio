<script lang="ts">
	import type {Icon} from "$lib/types/route";

	export let href = "";
	export let icon: Icon;
</script>

{#if href}
	<a {href}>
		<span class="sr-only">{icon.alt}</span>
		<img
			class="h-10 w-auto"
			src={icon.src}
			alt={icon.alt}
		/>
	</a>
{:else}
	<div>
		<span class="sr-only">{icon.alt}</span>
		<img
			class="h-10 w-auto"
			src={icon.src}
			alt={icon.alt}
		/>
	</div>
{/if}
