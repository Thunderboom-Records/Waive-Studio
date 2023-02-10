<script lang="ts">
	export let pattern: string;
</script>

<div class="flex flex-col bg-gray-900 justify-evenly px-2 w-full">
	<h3 class="text-red-500">{pattern}</h3>
	<button class="bg-red-400 btn rounded-xl w-24 h-6 text-sm">new pattern</button>
	<div class="flex flex-row space-x-1 justify-center place-items-center">
		<button class="btn rounded-full bg-gray-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
		<p class="text-xs text-gray-400">complex</p>
	</div>
</div>
