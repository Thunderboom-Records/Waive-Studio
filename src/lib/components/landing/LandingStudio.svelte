<script lang="ts">

	import LandingStudioCard from "$lib/components/landing/LandingStudioCard.svelte";
	import type {LandingStudioCardContent} from "$lib/types/route";

	let apps: LandingStudioCardContent[]  = [
		{
			title: "DAW",
			description: "Sinds de pandemie zijn augmented reality, avatars en kunstmatige intelligentie een steeds grotere rol gaan spelen in de live optredens van nu.",
			links: [
				{ label: "play", href: "#"},
				{ label: "code", href: "#"},
				{ label: "read more", href: "#"},
			],
			img: {
				src: "",
				alt: "daw screenshot",
				width: "1824",
				height: "1080"
			}
		},
		{
			title: "Sequencer",
			description: "Sinds de pandemie zijn augmented reality, avatars en kunstmatige intelligentie een steeds grotere rol gaan spelen in de live optredens van nu.",
			links: [
				{ label: "play", href: "#"},
				{ label: "code", href: "#"},
				{ label: "read more", href: "#"},
			],
			img: {
				src: "",
				alt: "sequencer screenshot",
				width: "1824",
				height: "1080"
			}
		},
	];
</script>

<div class="flex flex-col w-full bg-gray-700 space-y-8 py-16 justify-center items-center">

	<div class="w-full ">
		<h2 class=" text-center text-white font-semibold text-5xl">
			Studio
		</h2>
	</div>


	{#each apps as app}
		<LandingStudioCard content={app}/>
	{/each}
</div>