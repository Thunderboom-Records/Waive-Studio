<script lang="ts">
	export let elapsedTime: number;

	$: ms = elapsedTime % 1000;
	$: sec = Math.floor(elapsedTime / 1000) % 60;
	$: min = Math.floor(elapsedTime / 1000 / 60) % 60;
	$: formattedTime = `${min}:${sec}.${ms}`;
</script>

<div class="badge badge-lg text-white bg-gray-800 rounded-full py-1 px-8">{formattedTime}</div>
