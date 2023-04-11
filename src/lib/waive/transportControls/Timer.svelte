<script lang="ts">
	import { Loop, Draw, Transport } from 'tone';

	let formattedTime: string = `0:0:0`;

	const transportControlsLoop = new Loop((time) => {
    	Draw.schedule(()=>{
        	formattedTime = (Transport.position as string).slice(0, 5);
    	}, time)
	}, "32n");
	transportControlsLoop.start(0);
</script>

<div class="badge badge-lg text-white bg-gray-800 rounded-full py-1 w-32 text-center self-center">
	{formattedTime}
</div>
