<script lang="ts">
	let options: string[] = ['option 1', 'option 2', 'option 3'];
</script>

<select class="select h-8 w-60 rounded-full bg-gray-400 pl-4 text-start">
	<option disabled selected>---</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
