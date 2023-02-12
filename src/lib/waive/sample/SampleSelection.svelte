<script lang="ts">
	let options: string[] = ['option 1', 'option 2', 'option 3'];
</script>

<select class="select w-60 rounded-full text-center bg-gray-400 h-8">
	<option disabled selected>64n</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
