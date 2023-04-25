<script lang="ts">
	import { clamp, map } from "$lib/scripts/utils";
	import type { UndoableAction } from "$lib/types/waive";
	import type { ValueParameter } from "../audioEngine/parameter";
	import { history } from "../stores/undo";

	export let parameter: ValueParameter;

	export let disabled = false;
	export let lineColor = "black";
	export let pixelRange = 100;

	let startY = 0;
	let startVal = 0;
	
	let startRotation = -Math.PI * 0.8;

	$:value = map(parameter.value as number, parameter.range[0], parameter.range[1], 0, 1);
	$:rotation = startRotation + value * Math.PI * 0.8 * 2;

	function updatePosition(clientY: number){
		let valueDiff = (startY - clientY) / pixelRange;
		value = clamp(startVal + valueDiff, 0, 1);
		setParameter();
	}

	function setParameter(){
		parameter.set(map(value, 0, 1, parameter.range[0], parameter.range[1]));
	}

	function onPointerDown(e: PointerEvent){
		if(disabled){
			return
		}
		e.preventDefault();
		startY = e.clientY;
		startVal = value
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
	}

	function onPointerUp(e: PointerEvent){
		e.preventDefault();
		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerup', onPointerUp);

		if(startVal == value){
			return
		}

		const newVal = value;
		let action: UndoableAction = {
			name: "set value",
			description: `set ${parameter.name} to ${parameter.value}`,
			action: () => {
				value = newVal;
				setParameter();
			},
			undo: () => {
				value = startVal;
				setParameter();
			}
		}

		history.newAction(action, false);
	}


	function onPointerMove(e: PointerEvent){
		if(disabled){
			return
		}
		e.preventDefault();
		updatePosition(e.clientY);
	}
</script>

<div class="flex flex-col space-y-1 flex-shrink items-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 cursor-pointer knob rounded-full bg-gray-500"
		fill="none"
		viewBox="-12 -12 24 24"
		stroke="none"
		on:pointerdown={onPointerDown}
		style="--rotation: {rotation}"
	>
		<path d="M 0 0 L 0 -10" stroke={lineColor} stroke-width="3"/>
	</svg>
	<p class="text-gray-500 text-xs lg:text-sm text-center">
		{parameter.name}
	</p>
</div>

<style>
	.knob {
		transform: rotate(calc(var(--rotation) * 1rad));
		transform-origin: 50% 50%;
	}
</style>
