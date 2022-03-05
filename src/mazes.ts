import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";
import Ammo from "ammo.js";
import { AmmoJSPlugin, PhysicsImpostor, SceneLoader, Vector3 } from "@babylonjs/core";

export class Mazes{
    private maze;
    private centerOfMaze;
    CreateMaze(scene){
        var brick = new BABYLON.StandardMaterial("myMaterial", scene);
        this.centerOfMaze = new BABYLON.TransformNode("maze");
        brick.diffuseTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_Color.jpg", scene);
        brick.ambientTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_AmbientOcclusion.jpg", scene);
        brick.bumpTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_NormalDX.jpg", scene);
        console.log("first call");
        this.maze = BABYLON.SceneLoader.ImportMesh("","models/","maze01.babylon",scene,
             (meshes) => {
                console.log("second call");
                meshes[0].material = brick; //Ground or the plane where the walls stand on
                for (let i = 0; i < meshes.length; i++) {
                    meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(
                        meshes[i],
                        PhysicsImpostor.BoxImpostor,
                        {mass: 0, restitution:0,friction:100}
                    );
                    meshes[i].parent = this.centerOfMaze;   
                }
            }
        );

        console.log(this.centerOfMaze.position);
    }

    MoveForward(){
        
        this.centerOfMaze.rotate(new BABYLON.Vector3(0,0,-1),.01);
    }
    MoveBack(){
        this.centerOfMaze.rotate(new BABYLON.Vector3(0,0,1),.01);
    }
    MoveLeft(){
        this.centerOfMaze.rotate(new BABYLON.Vector3(1,0,0),.01);
    }
    MoveRight(){
        this.centerOfMaze.rotate(new BABYLON.Vector3(-1,0,0),.01);
    }
}