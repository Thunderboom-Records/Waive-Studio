<script lang="ts">
	import { clamp, map } from "$lib/scripts/utils";
	import type { UndoableAction } from "$lib/types/waive";
	import type { ValueParameter } from "../audioEngine/parameter";
	import { history } from "../stores/undo";

	export let parameter: ValueParameter | undefined;

	export let disabled = false;
	export let lineColor = "black";
	export let pixelRange = 100;
	export let label = parameter?.name;

	
	let startY = 0;
	let startVal = 0;
	
	let startRotation = -Math.PI * 0.8;
	
	if(typeof parameter === 'undefined'){
		disabled = true;
	} else {
		startVal = map(parameter.value as number, parameter.range[0], parameter.range[1], 0, 1);
	}
	
	
	$:value = map(parameter?.value as number, parameter?.range[0] as number, parameter?.range[1] as number, 0, 1);
	$:rotation = startRotation + value * Math.PI * 0.8 * 2;

	function updatePosition(clientY: number){
		let valueDiff = (startY - clientY) / pixelRange;
		value = clamp(startVal + valueDiff, 0, 1);
		setParameter();
	}

	function setParameter(){
		if(typeof parameter === 'undefined' || disabled) return

		parameter.set(map(value, 0, 1, parameter.range[0], parameter.range[1]));
	}

	function onPointerDown(e: PointerEvent){
		if(typeof parameter === 'undefined' || disabled) return

		e.preventDefault();
		startY = e.clientY;
		startVal = value
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
	}

	function onPointerUp(e: PointerEvent){
		if(typeof parameter === 'undefined' || disabled) return

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
		if(typeof parameter === 'undefined' || disabled) return

		e.preventDefault();
		updatePosition(e.clientY);
	}
</script>

<div class="flex flex-col space-y-1 flex-shrink items-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 knob rounded-full {disabled ? 'bg-gray-600' : 'bg-gray-500 cursor-pointer'}"
		fill="none"
		viewBox="-12 -12 24 24"
		stroke="none"
		on:pointerdown={onPointerDown}
		style="--rotation: {rotation}"
	>
		<path d="M 0 0 L 0 -10" stroke={lineColor} stroke-width="3"/>
	</svg>
	<p class="{disabled ? 'text-gray-600' : 'text-gray-500'} text-xs lg:text-sm text-center">
		{label}
	</p>
</div>

<style>
	.knob {
		transform: rotate(calc(var(--rotation) * 1rad));
		transform-origin: 50% 50%;
	}
</style>
