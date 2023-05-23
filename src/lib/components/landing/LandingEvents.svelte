<script lang="ts">
	import type { LandingEventsContent } from "$lib/types/route";
	import placeholder from "$lib/assets/waive-studio.jpeg"

	let events: LandingEventsContent[] = [
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "300",
				height: "120",
			},
		},
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "300",
				height: "120",
			},
		},
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "300",
				height: "120",
			},
		},
	]
</script>

<div class="flex flex-col w-full space-y-12 py-24 px-8 justify-center items-center bg-gradient-to-l from-yellow-500 to-yellow-700">
	<h2 class="text-white text-6xl lg:text-8xl w-full max-w-[60vw]">
		Events
	</h2>

	{#each events as event}
		<div class="w-full max-w-[60vw] bg-white flex flex-row space-x-8">
			<img src={event.img.src} alt={event.img.alt} width={event.img.width} height={event.img.height}/>
			<div class="flex justify-start items-center w-full">
				<h3 class="text-black text-center  text-2xl">{event.title}</h3>
			</div>
		</div>
	{/each}
</div>
