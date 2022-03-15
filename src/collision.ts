import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import * as WATERMAT from "@babylonjs/materials"
import Ammo from "ammo.js";
import { AmmoJSPlugin, Mesh, MeshBuilder, PhysicsImpostor, Size, TrajectoryClassifier, Vector3 } from "@babylonjs/core";
import { Mazes } from "./mazes";
import { Ball } from "./ball";

export class Collisions{
    
    private ball = new Ball();

    private collider;

    private touching = false;;
    
    createGhostCollider(x,y,z,size,centerOfMaze,scene, ball){

        this.collider = BABYLON.MeshBuilder.CreateBox("collider",{size:size});
        var colliderMat = new BABYLON.StandardMaterial("colliderMat",scene);
        colliderMat.diffuseColor = BABYLON.Color3.Red();
        this.collider.material = colliderMat;
        this.collider.visibility = 0.4;
        this.collider.position.x = x;
        this.collider.position.y = y;
        this.collider.position.z = z;

        this.collider.physicsImpostor = new BABYLON.PhysicsImpostor(this.collider,BABYLON.PhysicsImpostor.BoxImpostor,{mass:0,restitution:0});
        this.collider.parent = centerOfMaze;

        this.moveToNextLevel(ball,scene);
    }


    public moveToNextLevel(ball,scene){
        scene.registerBeforeRender(()=>{
            if(this.collider.intersectsMesh(ball.sphere)){
                this.touching = true;
            }else{
                this.touching = false;
            }
        });
        
    }

    CheckTrigger(): Boolean{
        if(this.touching == true){
            return true;
        }
        return false;        
    }
}