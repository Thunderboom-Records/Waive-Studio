<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="min-h-screen min-w-screen bg-gray-800 p-8">
	<slot />
</main>
