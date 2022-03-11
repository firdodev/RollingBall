import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { PhysicsImpostor} from "@babylonjs/core";
import { Collisions } from "./collision";
import { Ball } from "./ball";
import { Map } from "./map";

//You can change it by making the path with 0 and "p" => for the end of the game
	// private defaultMaze = [
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,1,1,1,1,1,1],
	// ];
export class Mazes{	
	private cubeSize = 5;
	private platform;
	private wallCube;
	private platformMat;
	private wallMat;

	private collisions = new Collisions();
	private map:Map;
    // private ball:Ball = new Ball;


	private maze01 = [
		[1,"p","p",1,1,1,1,1,1,1],
		[1,0,0,1,1,1,1,1,1,1],
		[1,0,0,1,1,1,1,1,1,1],
		[1,0,0,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	];

	private maze02 = [
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,"p","p",1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	];

	private maze03 = [
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,0,1],
		[1,1,1,1,0,0,0,0,0,1],
		[1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,1,1,1,0,0,1],
		[1,"p",0,0,0,0,0,0,0,1],
		[1,"p",0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	];

	private mazes = new Array(this.maze01, this.maze02, this.maze03);
	private currentMaze = 0;
    private centerOfMaze;
	drawMaze(scene){
		//Random level generated
		// this.map = new Map(this.mazes[Math.floor(Math.random() * this.mazes.length)]);
		this.map = new Map(this.mazes[1]);

	}

	moveTrigger(){
		return this.collisions.CheckTrigger();
	}

	CreateMaze(scene, ball){
		
		// ball = new Ball;
		//Platform Material
		this.platformMat = new BABYLON.StandardMaterial("platformMat",scene);
		this.platformMat.diffuseTexture = new BABYLON.Texture("textures/Wood/Color.jpg",scene);
		this.platformMat.bumpTexture = new BABYLON.Texture("textures/Wood/NormalGL.jpg",scene);
		

		//Wall Material
		this.wallMat = new BABYLON.StandardMaterial("wallMat",scene);
		this.wallMat.diffuseTexture = new BABYLON.Texture("textures/MarbleWhite/Color.jpg",scene);
		this.wallMat.bumpTexture = new BABYLON.Texture("textures/MarbleWhite/NormalDX.jpg",scene);
		this.wallMat.bumpHeight = 10;	
	
		this.centerOfMaze = new BABYLON.TransformNode("maze");
		
		let h = this.map.getHeight();
		let w = this.map.getWidth();

		let getShape = this.map.getMap();

		for(let y = 0; y < h; y++){
			for(let x = 0; x < w; x++){
				
				if(getShape[x][y] == 1){
					this.wallCube = BABYLON.MeshBuilder.CreateBox("wall",{width:this.cubeSize, height:this.cubeSize * 2, depth:this.cubeSize},scene);
					
					this.wallCube.physicsImpostor = new BABYLON.PhysicsImpostor(this.wallCube,PhysicsImpostor.BoxImpostor,{mass:0,restitution:0,friction:100});

					this.wallCube.position.x = x * this.cubeSize;
					this.wallCube.position.y = 1;
					this.wallCube.position.z = y * this.cubeSize;
					this.wallCube.material = this.wallMat;
					this.wallCube.parent = this.centerOfMaze;					
								
				}
				this.platform = BABYLON.MeshBuilder.CreateBox("cube",{width:this.cubeSize,height:0.1,depth:this.cubeSize},scene);
		
				this.platform.position.x = x * this.cubeSize;
				this.platform.position.y = 0;
				this.platform.position.z = y * this.cubeSize;
				this.platform.physicsImpostor = new BABYLON.PhysicsImpostor(this.platform,PhysicsImpostor.BoxImpostor,{mass:0,restitution:0,friction:100});
				this.platform.material = this.platformMat;
				this.platform.parent = this.centerOfMaze;

				if(getShape[x][y] == "p"){
					this.collisions.createGhostCollider(x * this.cubeSize,1,y * this.cubeSize,this.cubeSize,this.centerOfMaze,scene,ball);
				}
				
			}
		}
		console.log(this.centerOfMaze.rotation);
		// this.centerOfMaze.rotationQuaternion
		//console.log(this.centerOfMaze.position);
    }

	MoveToNextLevel(scene){
        // if(this.moveTrigger() == true){
		console.log(this.moveTrigger());
		let h = this.map.getHeight();
		let w = this.map.getWidth();
		for(let y = 0; y < h; y++){
			for(let x = 0; x < w; x++){
				// this.wallCube.dispose();
				// this.platform.dispose();
				// this.drawMaze(scene);
				this.centerOfMaze.dispose();
				this.currentMaze++;
				this.drawMaze(scene);
			}
		}
	}

    MoveForward(){
		if(this.centerOfMaze.rotation.z == -0.10999999999999999){
			this.centerOfMaze.rotation.z = -0.10999999999999999;
		}else{
			this.centerOfMaze.rotation.z -= 0.01;
		}
	}
    MoveBack(){
        if(this.centerOfMaze.rotation.z == 0.15){
			this.centerOfMaze.rotation.z = 0.15;
		}else{
			this.centerOfMaze.rotation.z += 0.01;
		}
    }
    MoveLeft(){
        if(this.centerOfMaze.rotation.x == 0.09){
			this.centerOfMaze.rotation.x = 0.09;
		}else{
			this.centerOfMaze.rotation.x += 0.01;
		}
    }
    MoveRight(){
		if(this.centerOfMaze.rotation.x == -0.09){
			this.centerOfMaze.rotation.x = -0.09;
		}else{
			this.centerOfMaze.rotation.x -= 0.01;
		}
    }
}
