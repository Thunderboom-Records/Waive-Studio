import type { FXParameter } from "$lib/types/waive";

export class NodeManager {
    nodeTree: any;

    constructor(){
        this.nodeTree = {};
    }

    load(){
        /* Load a node tree from JSON */
    }

    save(){
        /* Dump node tree into JSON for saving */
    }

    add(address: string, parameter: FXParameter){

    }

    getParameter(address: string){
        // e.g `Drums/00_KD/EQ3/Mid`

    }

    setParameter(address: string, value: number){

    }
}