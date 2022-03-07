import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { PhysicsImpostor} from "@babylonjs/core";

export class Mazes{	
	private cubeSize = 5;
	private platform;
	private wallCube;
	private cubeRandomColor;
    private maze;

	private maze01 = [
		[1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1],
	];

    private centerOfMaze;
    
	CreateMaze(scene){


		this.cubeRandomColor = new BABYLON.StandardMaterial("rMAT",scene);
		this.cubeRandomColor.diffuseColor = new BABYLON.Color3(Math.random() * 1.0, Math.random() * 1.0, Math.random() * 1.0);
		
		//TODO:Rrregullo Kodin Asynchron
		
		//Static Maze Created with matrix
		this.centerOfMaze = new BABYLON.TransformNode("maze");
		for(let y = 0; y < this.maze01.length; y++){
			for(let x = 0; x < this.maze01[y].length; x++){
				this.platform = BABYLON.MeshBuilder.CreateBox("cube",{width:this.cubeSize,height:0.1,depth:this.cubeSize},scene);
				this.platform.material = this.cubeRandomColor;
		
				this.platform.position.x = x * this.cubeSize;
				this.platform.position.y = 0;
				this.platform.position.z = y * this.cubeSize;
				this.platform.physicsImpostor = new BABYLON.PhysicsImpostor(this.platform,PhysicsImpostor.BoxImpostor,{mass:0,restitution:0,friction:100});
				this.platform.parent = this.centerOfMaze;
				
			}
		}

		//Static Maze Created with blender
		/*
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
        );*/

		//console.log(this.centerOfMaze.position);
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
