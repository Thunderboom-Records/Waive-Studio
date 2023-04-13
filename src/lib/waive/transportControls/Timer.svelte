<script lang="ts">
	import { Loop, Draw, Transport } from 'tone';

	let formattedTime: string = `1 : 1 : 1`;

	const transportControlsLoop = new Loop((time) => {
    	Draw.schedule(()=>{
			let digits = (Transport.position as string).split(":");
			for(let i = 0; i < digits.length; i++){
				digits[i] = String(Math.floor(parseInt(digits[i])) + 1);
			}
        	formattedTime = digits.join(' : ');
    	}, time)
	}, "32n");
	transportControlsLoop.start(0);
</script>

<div class="badge badge-lg text-white text-xl bg-gray-800 rounded-full py-1 w-32 text-center self-center">
	{formattedTime}
</div>
