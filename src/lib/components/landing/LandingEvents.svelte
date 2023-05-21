<script lang="ts">
	import type { LandingEventsContent } from "$lib/types/route";
	import placeholder from "$lib/assets/waive-studio.jpeg"

	let events: LandingEventsContent[] = [
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "400",
				height: "200",
			},
		},
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "400",
				height: "200",
			},
		},
		{
			title: "Amsterdam Dance Event",
			img: {
				src: placeholder,
				alt: "alt",
				width: "400",
				height: "200",
			},
		},
	]
</script>

<div class="w-full min-h-[32rem]  bg-orange-500 pt-4 flex flex-col justify-center items-center p-8 space-y-4">
	<h2 class="text-center text-white font-semibold text-6xl mt-4">
		Events
	</h2>

	{#each events as event}
		<div class="w-2/3 h-[16rem] bg-white flex flex-row space-x-8">
			<img src={event.img.src} alt={event.img.alt} width={event.img.width} height={event.img.height}/>
			<div class="flex justify-start items-center w-full">
				<h3 class="text-black text-center text-2xl">{event.title}</h3>
			</div>
		</div>
	{/each}
</div>