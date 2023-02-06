<script lang="ts">
	import type { PageData } from './$types';

	import MainControlSection from '$lib/player/main-controls/MainControlSection.svelte';
	import MasterFxSection from '$lib/player/master-fx/MasterFxSection.svelte';
	import PatternSection from '$lib/player/pattern/PatternSection.svelte';
	import PlayerSection from '$lib/player/player/PlayerSection.svelte';
	import SampleSection from '$lib/player/sample/SampleSection.svelte';

	export let data: PageData;
</script>

<div class="flex flex-col bg-gray-900">
	<section class="border border-green-400">
		<div class="w-1/3">
			<MainControlSection />
		</div>
		<div>
			<MasterFxSection />
		</div>
	</section>

	<section class="flex flex-row">
		<div>
			<PatternSection />
		</div>
		<div>
			<SampleSection />
		</div>
		<div>
			<PlayerSection />
		</div>
	</section>
</div>
