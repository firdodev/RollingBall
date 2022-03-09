import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import * as WATERMAT from "@babylonjs/materials"
import Ammo from "ammo.js";
import { AmmoJSPlugin, Mesh, MeshBuilder, PhysicsImpostor, Size, Vector3 } from "@babylonjs/core";
import { Mazes } from "./mazes";
import { Ball } from "./ball";

export class Collisions{
    
    private ball = new Ball();

    private collider;
    
    createGhostCollider(x,y,z,size,centerOfMaze,scene, ball){
        this.collider = BABYLON.MeshBuilder.CreateBox("collider",{size:size});
        this.collider.visibility = 0.4;
        this.collider.position.x = x;
        this.collider.position.y = y;
        this.collider.position.z = z;

        this.collider.physicsImpostor = new BABYLON.PhysicsImpostor(this.collider,BABYLON.PhysicsImpostor.BoxImpostor,{mass:0,restitution:0});
        this.collider.parent = centerOfMaze;

        this.moveToNextLevel(ball);
    }


    public moveToNextLevel(ball){
        // console.log('-------',test,'111',this.ball);
        ball.sphere.physicsImpostor.registerOnPhysicsCollide(
            this.collider.physicsImpostor,
            ()=>{
                console.log("TOUCHING THE DETECTOR");
            }
        );
    }
}