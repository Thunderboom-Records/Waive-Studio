<script lang="ts">
	import type { Bar } from '$lib/types/waive';

	export let bar: Bar;
</script>

<div class="rounded-md w-11 h-28 bg-{bar.instrument.color}-600 ">
	{bar.index}
</div>
