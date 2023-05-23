<script lang="ts">
	import placeholder from "$lib/assets/waive-studio.jpeg"

	let items = [
		{
			src: placeholder,
			alt: "waive studio"
		},
		{
			src: placeholder,
			alt: "waive studio"
		},
		{
			src: placeholder,
			alt: "waive studio"
		},
		{
			src: placeholder,
			alt: "waive studio"
		},
		{
			src: placeholder,
			alt: "waive studio"
		},
	];
</script>

<div class="flex flex-col w-full bg-gray-800 space-y-12 py-24 px-8 justify-center items-center">
	<h2 class="text-white text-6xl w-full max-w-[60vw] lg:text-8xl">
		Tutorials
	</h2>
	<div class="flex flex-row w-full max-w-[60vw]">
		<div class="carousel rounded-box flex flex-row">
			{#each items as item}
				<div class="carousel-item">
					<img src={item.src} alt={item.alt} width="600px" height="400px"/>
				</div>
			{/each}
		</div>
	</div>

</div>


