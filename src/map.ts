import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { PhysicsImpostor} from "@babylonjs/core";
import { Collisions } from "./collision";
import { Ball } from "./ball";

export class Map{
    private map = [];

    constructor(map){
        this.map = map;
    }

    getHeight(){
        return this.map.length;
    }

    getWidth(){
        return this.map[0].length;
    }

    getMap(){
        return this.map;
    }


}