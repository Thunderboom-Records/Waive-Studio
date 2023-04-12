<script lang="ts">
	let options: string[] = ['lowpass', 'bandpass', 'highpass'];
</script>

<select class="select max-w-xs rounded-full text-center bg-gray-400 h-6 px-4">
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
