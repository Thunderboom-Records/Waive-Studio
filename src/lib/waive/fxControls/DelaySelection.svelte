<script lang="ts">
	let options: string[] = ['option 1', 'option 2', 'option 3'];
</script>

<select class="select h-6 max-w-xs rounded-full bg-gray-400 text-center">
	<option disabled selected>64n</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
