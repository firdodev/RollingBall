import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";
import Ammo from "ammo.js";
import { AmmoJSPlugin, PhysicsImpostor, Vector3 } from "@babylonjs/core";

export class Mazes{
    CreateMaze(scene){
        var brick = new BABYLON.StandardMaterial("myMaterial", scene);
        brick.diffuseTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_Color.jpg", scene);
        brick.ambientTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_AmbientOcclusion.jpg", scene);
        brick.bumpTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_NormalDX.jpg", scene);

        var maze = BABYLON.SceneLoader.ImportMesh("","models/","maze01.babylon",scene,

            function (meshes) {
                // meshes[0].position.x = 0;
                // meshes[1].position.x = 0;
                // meshes[2].position.x = 0;
                // meshes[3].position.x = 0;
                // meshes[4].position.x = 0;

                meshes[0].material = brick;


                
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
}