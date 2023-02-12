<script lang="ts">
	import DelaySelection from './DelaySelection.svelte';
	import FilterSelection from './FilterSelection.svelte';
	import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<section class="flex flex-col w-full">
	<div>
		<h2 class="text-gray-400 text-center">master fx</h2>
	</div>
	<div class="flex flex-row">
		<!-- Delay Controls -->
		<div class="flex flex-col w-full">
			<FxHeader>delay</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<FxKnob>feedback</FxKnob>
				<DelaySelection />
			</div>
		</div>

		<!-- Reverb Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>reverb</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<FxKnob>decay</FxKnob>
				<FxKnob>wet</FxKnob>
			</div>
		</div>

		<!-- Filter Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>filter</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<FilterSelection />
				<FxKnob>frequency</FxKnob>
				<FxKnob>q</FxKnob>
			</div>
		</div>

		<!-- EQ Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>eq3</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<FxKnob>low</FxKnob>
				<FxKnob>mid</FxKnob>
				<FxKnob>high</FxKnob>
			</div>
		</div>

		<!-- Compressor Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>compressor</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-4 p-4">
				<FxKnob>attack</FxKnob>
				<FxKnob>release</FxKnob>
				<FxKnob>ratio</FxKnob>
				<FxKnob>threshold</FxKnob>
			</div>
		</div>

		<!-- Gain Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>gain</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<FxKnob>gain</FxKnob>
			</div>
		</div>

		<!-- Limiter Controls -->
		<div class="border-x-2 border-gray-800 flex flex-col w-full">
			<FxHeader>limiter</FxHeader>
			<div class="flex flex-row justify-center items-center h-full space-x-2 p-4">
				<FxKnob>threshold</FxKnob>
			</div>
		</div>
	</div>
</section>
