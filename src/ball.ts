import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { Mesh, MeshBuilder } from "@babylonjs/core";

export class Ball{
	private sphereDiameter = 5;
    public sphere;
    private rotSpeed = .5;


    CreateBall(scene){
        this.sphere= BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: this.sphereDiameter }, scene);
        this.sphere.position.y = 10;
		this.sphere.position.x = 25;
		this.sphere.position.z = 25;
		console.log(this.sphere.position);

        //Material
        var sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
        sphereMat.diffuseTexture = new BABYLON.Texture("textures/Marble/Marble006_4K_Color.jpg", scene);
        sphereMat.bumpTexture = new BABYLON.Texture("textures/Marble/Marble006_4K_NormalDX.jpg", scene);
        this.sphere.material = sphereMat;

        //Physics
        this.sphere.physicsImpostor = new BABYLON.PhysicsImpostor(this.sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1});
    
		this.sphere.physicsImpostor.physicsBody.linearDamping = 0;
		this.sphere.physicsImpostor.physicsBody.angularDamping = 0;
	}

    getX():number{
        return this.sphere.x;
    }

    getZ(){
        return this.sphere.z;
    }




	//Enable this if you want to move the ball with w a s d from the keyboard and the code in app.ts
    /*MoveForward(){
        this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(this.rotSpeed,0,0),BABYLON.Vector3.Zero());
	}
    MoveBack(){
        this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(-this.rotSpeed,0,0),BABYLON.Vector3.Zero());
    }
    MoveLeft(){
        this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0,0,this.rotSpeed),BABYLON.Vector3.Zero());
    }
    MoveRight(){
        this.sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0,0,-this.rotSpeed),BABYLON.Vector3.Zero());
    }*/
}
