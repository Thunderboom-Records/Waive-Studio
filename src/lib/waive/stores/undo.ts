import { writable, type Writable, get } from 'svelte/store';

import type { UndoableAction } from "$lib/types/waive";


class UndoHistory {
    undoStack: Writable<UndoableAction[]> = writable([]);
    redoStack: Writable<UndoableAction[]> = writable([]);
    callback?: () => void;
    subscribe: any;
    set: any;
    update: any;

    newAction(action: UndoableAction){
        action.action();
        this.undoStack.update(v => [...v, action]);
        this.redoStack.set([]);
    }

    undo(){
        let action = get(this.undoStack).pop();

        if(typeof action === 'undefined'){
            return
        }
        // this.printStatus();
        action.undo();
        this.undoStack.update(v => v);
        this.redoStack.update(v => [...v, action as UndoableAction]);
    }

    redo(){
        let action = get(this.redoStack).pop();
        if(typeof action === 'undefined'){
            return
        }
        // this.printStatus();
        action.action();
        this.redoStack.update(v => v)
        this.undoStack.update(v => [...v, action as UndoableAction]);
    }

    printStatus(){
        console.log("== History status ==")
        console.log(`undoStack: ${JSON.stringify(get(this.undoStack), ["name", "description", "undo"], 2)}`)
        console.log(`redoStack: ${JSON.stringify(get(this.redoStack), ["name", "description", "action"], 2)}`)
        console.log("== end ==")
    }
}

export const history = new UndoHistory();