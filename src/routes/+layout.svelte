<script lang="ts">
	import '$lib/styles/app.postcss';
	export const ssr = false;

</script>

<svelte:head>
	<title>Waive Studio</title>
</svelte:head>


<main class="min-h-screen max-h-screen min-w-screen bg-gray-800 p-6 ">
	<div class="rounded-xl bg-gray-800 p-6 shadow-2xl shadow-gray-600 border border-gray-500 h-full">
		<slot />
	</div>
</main>

