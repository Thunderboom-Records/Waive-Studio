<script lang="ts">
</script>

<div class="flex flex-shrink flex-col space-y-1">
	<button class="btn place-self-center rounded-full bg-gray-500 hover:bg-gray-600">
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
	<p class="text-center text-xs text-gray-500 lg:text-sm">
		<slot />
	</p>
</div>
