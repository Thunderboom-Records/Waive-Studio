.<script lang="ts">
	export let name;
</script>

<div class="bg-gray-700 flex flex-col p-1 rounded-lg items-center justify-center w-8">
    <h1 class="-rotate-90 text-white capitalize">
		{name.toString().toLowerCase()}
    </h1>
</div>