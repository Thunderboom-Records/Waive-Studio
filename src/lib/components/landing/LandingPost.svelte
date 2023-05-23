<script lang="ts">
	import type {LandingPostContent} from "$lib/types/route";

	let content: LandingPostContent = {
		title: "From the archives to the dance floor with AI",
		description: "Sinds de pandemie zijn augmented reality, avatars en kunstmatige intelligentie een steeds grotere rol gaan spelen in de live optredens van nu.",
		link: {
			href: "#",
			label: "Read more"
		}
	}
</script>

<div class="w-full flex flex-row text-white ">
	<div class="w-full bg-gradient-to-t from-purple-500 to-purple-600">
		<div class="max-w-7xl flex flex-col justify-center items-start p-24 space-y-8">
			<h2 class="tracking-wide text-6xl lg:text-8xl">
				{content.title}
			</h2>
			<p class="text-sm md:text-lg tracking-widest">
				{content.description}
			</p>
			<a href={content.link.href} class=" text-md md:text-lg leading-6 text-white">
				{content.link.label.toUpperCase()} <span aria-hidden="true" class="text-purple-600"> > </span>
			</a>
		</div>

	</div>
	<div class="w-48 bg-gradient-to-b from-purple-500 to-purple-600">
	</div>
</div>