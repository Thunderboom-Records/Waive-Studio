<script lang="ts">
	import { ChannelType, type Channel } from '$lib/types/waive';
	import { getContext } from 'svelte';

	let channel: Channel = getContext('channel');

	function download() {
		console.log(`downloading ${ChannelType[channel.type]}`);
	}
</script>

<div class="flex flex-row items-center justify-center bg-gray-900 ">
	<button
		on:click={download}
		class="flex h-8 w-12 flex-row place-items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 "
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
			<path
				fill-rule="evenodd"
				d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>
