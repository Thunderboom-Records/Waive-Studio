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

<div class="w-full h-[32rem]  bg-gray-800 pt-4">
	<h2 class="text-white font-semibold text-3xl text-center">
		Tutorials
	</h2>
	<div class="flex flex-row w-full">
		<div class="carousel rounded-box flex flex-row">
			{#each items as item}
				<div class="carousel-item">
					<img src={item.src} alt={item.alt} width="600px" height="400px"/>
				</div>
			{/each}
		</div>
	</div>

</div>


