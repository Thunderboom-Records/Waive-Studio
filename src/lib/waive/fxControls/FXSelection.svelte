<script lang="ts">
	import type { UndoableAction } from "$lib/types/waive";
	import type { ListParameter } from "../audioEngine/parameter";
	import { history } from "../stores/undo";

    export let parameter: ListParameter;

    let selected: string = parameter.value;
    let prevSelected: string = parameter.value;

    function update(){
        const newVal = selected;
        const oldVal = prevSelected;

        let action: UndoableAction = {
            name: "set parameter",
            description: `set ${parameter.name} to ${newVal}`,
            action: () => {
                parameter.set(selected);
                prevSelected = selected;
                selected = newVal;
            },
            undo: () => {
                selected = oldVal;
                parameter.set(oldVal);
            }
        }
        history.newAction(action);
    }

</script>

 <select bind:value={selected} on:change={update} class="select select-sm font-medium leading-9 rounded-full text-center bg-gray-400 h-6"> -->
    {#each parameter.options as option}
        <option value={option}>{option}</option>
    {/each}
</select>