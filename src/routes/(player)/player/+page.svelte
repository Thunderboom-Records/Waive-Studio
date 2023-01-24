<script lang="ts">
	import MainControlSection from '$lib/components/player/main-controls/MainControlSection.svelte';
	import MasterFxSection from '$lib/components/player/master-fx/MasterFxSection.svelte';
	import PatternSection from '$lib/components/player/pattern/PatternSection.svelte';
	import PlayerSection from '$lib/components/player/player/PlayerSection.svelte';
	import SampleSection from '$lib/components/player/sample/SampleSection.svelte';
	import type { PageData } from './$types';

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
