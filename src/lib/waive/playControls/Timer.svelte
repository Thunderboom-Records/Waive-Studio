<script lang="ts">
	export let elapsedTime: number;

	$: ms = elapsedTime % 1000;
	$: sec = Math.floor(elapsedTime / 1000) % 60;
	$: min = Math.floor(elapsedTime / 1000 / 60) % 60;
	$: formattedTime = `${min}:${sec}.${ms}`;
</script>

<div class="badge badge-lg w-32 rounded-full bg-gray-800 py-1 text-center text-white">
	{formattedTime}
</div>
