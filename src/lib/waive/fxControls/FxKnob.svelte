<script lang="ts">
</script>

<div class="flex flex-col space-y-1 flex-shrink">
	<button class="btn rounded-full bg-gray-500 hover:bg-gray-600 place-self-center">
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
	<p class="text-gray-500 text-xs lg:text-sm text-center">
		<slot />
	</p>
</div>
