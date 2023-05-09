<script lang="ts">
	import type { FX } from "$lib/types/waive";
	import { BypassableFX } from "../audioEngine/bypassableFX";

	export let fx: FX;

	function toggle(){
		if(fx.node instanceof BypassableFX ){
			fx.enabled = !fx.enabled;
			fx.node.bypass = !fx.enabled;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggle} class="{fx.bypassable ? 'cursor-pointer' : ''} p-1 m-1">
	<h3 class="{fx.enabled ? 'text-white' : 'text-gray-600'} text-center">
		<slot />
	</h3>
</div>
