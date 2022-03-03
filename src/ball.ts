import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";
import Ammo from "ammo.js";
import { AmmoJSPlugin, PhysicsImpostor, Vector3 } from "@babylonjs/core";

export class Ball{
    CreateBall(scene){
        var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
        sphere.position.y = 10;
        
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
            sphere,
            PhysicsImpostor.SphereImpostor,
            {mass:1,friction:1}
        );
        sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 5, 0), BABYLON.Vector3.Zero());
    }
}