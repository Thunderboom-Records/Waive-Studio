<script lang="ts">
	let options: string[] = ['option 1', 'option 2', 'option 3'];
</script>

<select class="select max-w-xs rounded-full text-center bg-gray-400 h-6 px-4">
	<option disabled selected>lowpass</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
