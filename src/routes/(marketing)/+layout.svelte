<script>
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/app.postcss';
</script>

<svelte:head>
	<title>Waive Studio</title>
</svelte:head>

<div class="min-h-screen bg-slate-800">
	<div class="flex flex-col ">
		<slot />
		<Footer />
	</div>
</div>
