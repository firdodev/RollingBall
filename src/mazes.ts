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
    CreateMaze(scene){
        var brick = new BABYLON.StandardMaterial("myMaterial", scene);
        brick.diffuseTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_Color.jpg", scene);
        brick.ambientTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_AmbientOcclusion.jpg", scene);
        brick.bumpTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_NormalDX.jpg", scene);
        this.maze = BABYLON.SceneLoader.ImportMesh("","models/","maze01.babylon",scene,
            function (meshes) {
                meshes[0].material = brick; //Ground or the plane where the walls stand on
                for (let i = 0; i < meshes.length; i++) {
                    meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(
                        meshes[i],
                        PhysicsImpostor.BoxImpostor,
                        {mass: 0, restitution:3,friction:0.5}
                    );
                }
            }
        );
    }

    RotateRight(){
        this.maze.rotation.x = -90; 
    }
}