<script lang="ts">
	import '$lib/styles/app.postcss';
</script>

<svelte:head>
	<title>Waive Studio</title>
</svelte:head>


<main class="h-full max-h-screen min-w-screen bg-gray-800 p-6 ">
	<div class="rounded-xl bg-gray-800 p-6 shadow-2xl shadow-gray-600 border border-gray-500 ">
		<slot />
	</div>
</main>

