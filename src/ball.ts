import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";
import Ammo from "ammo.js";
import { AmmoJSPlugin, PhysicsImpostor, Vector3 } from "@babylonjs/core";

export class Ball{
    private sphere:BABYLON.Mesh;

    CreateBall(scene){
        this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
        this.sphere.position.y = 10;

        var sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
        // sphereMat.diffuseColor = BABYLON.Color3.Red(); ==> Red Color of Sphere
        sphereMat.diffuseTexture = new BABYLON.Texture("textures/Marble/Marble006_4K_Color.jpg", scene);
        sphereMat.bumpTexture = new BABYLON.Texture("textures/Marble/Marble006_4K_NormalDX.jpg", scene);
        this.sphere.material = sphereMat;
        
        this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.sphere,
            PhysicsImpostor.SphereImpostor,
            {mass:1,friction:1}
        );
        this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 5, 0), BABYLON.Vector3.Zero());
    }

    // MoveForward(){
    //     this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(1,0,0),BABYLON.Vector3.Zero());
    // }
    // MoveBack(){
    //     this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(-1,0,0),BABYLON.Vector3.Zero());
    // }
    // MoveLeft(){
    //     this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0,0,1),BABYLON.Vector3.Zero());
    // }
    // MoveRight(){
    //     this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0,0,-1),BABYLON.Vector3.Zero());
    // }
}