<script src="ts">
	import ColorPlaceholders from "$lib/components/ColorPlaceholders.svelte";
	import LandingBanner from "$lib/components/landing/LandingBanner.svelte";
	import LandingVideo from "$lib/components/landing/LandingVideo.svelte";
	import LandingPost from "$lib/components/landing/LandingPost.svelte";
	import LandingStudio from "$lib/components/landing/LandingStudio.svelte";
	import LandingTutorials from "$lib/components/landing/LandingTutorials.svelte";
	import LandingEvents from "$lib/components/landing/LandingEvents.svelte";
</script>

<div class="bg-gray-800 h-full">
	<LandingBanner />

	<LandingVideo />

	<LandingPost />

	<LandingStudio />

	<LandingTutorials />

	<LandingEvents />

</div>



<!-- TODO: REMOVE -->
<div class="hidden">
	<ColorPlaceholders/>
</div>
