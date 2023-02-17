<script lang="ts">
	import DelaySelection from './DelaySelection.svelte';
	import FilterSelection from './FilterSelection.svelte';
	import FxHeader from './FxHeader.svelte';
	import FxKnob from './FxKnob.svelte';
</script>

<section class="flex w-full flex-col">
	<div>
		<h2 class="text-center text-gray-400">master fx</h2>
	</div>
	<div class="flex flex-row">
		<!-- Delay Controls -->
		<div class="flex w-full flex-col">
			<FxHeader>delay</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-2 p-4">
				<FxKnob>feedback</FxKnob>
				<DelaySelection />
			</div>
		</div>

		<!-- Reverb Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>reverb</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-2 p-4">
				<FxKnob>decay</FxKnob>
				<FxKnob>wet</FxKnob>
			</div>
		</div>

		<!-- Filter Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>filter</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-4 p-4">
				<FilterSelection />
				<FxKnob>frequency</FxKnob>
				<FxKnob>q</FxKnob>
			</div>
		</div>

		<!-- EQ Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>eq3</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-4 p-4">
				<FxKnob>low</FxKnob>
				<FxKnob>mid</FxKnob>
				<FxKnob>high</FxKnob>
			</div>
		</div>

		<!-- Compressor Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>compressor</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-4 p-4">
				<FxKnob>attack</FxKnob>
				<FxKnob>release</FxKnob>
				<FxKnob>ratio</FxKnob>
				<FxKnob>threshold</FxKnob>
			</div>
		</div>

		<!-- Gain Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>gain</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-2 p-4">
				<FxKnob>gain</FxKnob>
			</div>
		</div>

		<!-- Limiter Controls -->
		<div class="flex w-full flex-col border-x-2 border-gray-800">
			<FxHeader>limiter</FxHeader>
			<div class="flex h-full flex-row items-center justify-center space-x-2 p-4">
				<FxKnob>threshold</FxKnob>
			</div>
		</div>
	</div>
</section>
