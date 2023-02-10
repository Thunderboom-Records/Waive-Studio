<script lang="ts">
	import DelaySelection from './DelaySelection.svelte';
	import FilterSelection from './FilterSelection.svelte';
	import MasterFxHeader from './MasterFxHeader.svelte';
	import MasterFxKnob from './MasterFxKnob.svelte';
</script>

<section class="flex flex-col">
	<div>
		<h2 class="text-gray-300 text-center">master fx</h2>
	</div>
	<div class="flex flex-row">
		<div class="flex flex-col">
			<MasterFxHeader>delay</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<MasterFxKnob>feedback</MasterFxKnob>
				<DelaySelection />
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>reverb</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<MasterFxKnob>decay</MasterFxKnob>
				<MasterFxKnob>wet</MasterFxKnob>
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>filter</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<FilterSelection />
				<MasterFxKnob>frequency</MasterFxKnob>
				<MasterFxKnob>q</MasterFxKnob>
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>eq3</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<MasterFxKnob>low</MasterFxKnob>
				<MasterFxKnob>mid</MasterFxKnob>
				<MasterFxKnob>high</MasterFxKnob>
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>compressor</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<MasterFxKnob>attack</MasterFxKnob>
				<MasterFxKnob>release</MasterFxKnob>
				<MasterFxKnob>ratio</MasterFxKnob>
				<MasterFxKnob>threshold</MasterFxKnob>
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>gain</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<MasterFxKnob>gain</MasterFxKnob>
			</div>
		</div>

		<div class="border-x-2 border-gray-800 flex flex-col">
			<MasterFxHeader>limiter</MasterFxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<MasterFxKnob>threshold</MasterFxKnob>
			</div>
		</div>
	</div>
</section>
