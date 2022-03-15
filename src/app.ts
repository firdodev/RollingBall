import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "babylonjs-gui";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import * as WATERMAT from "@babylonjs/materials"
import Ammo from "ammo.js";
import { AmmoJSPlugin, MeshBuilder, PhysicsImpostor, Size, Vector3 } from "@babylonjs/core";
import { Mazes } from "./mazes";
import { Ball } from "./ball";
import * as GUI from "babylonjs-gui";
class App{
    private ball:Ball = new Ball;
    private maze:Mazes = new Mazes;
    private canvas;

    // private gameH:GameHandler = new GameHandler(this.canvas);
    constructor() {
        // create the canvas html element and attach it to the webpage
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.id = "gameCanvas";
        document.body.appendChild(this.canvas);

        // initialize babylon scene and engine
        var engine = new BABYLON.Engine(this.canvas, true);
        var scene = new BABYLON.Scene(engine);
        // scene.clearColor = new BABYLON.Color4(0,.4,1); ==> Color for background

        // Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 3000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
		skybox.material = skyboxMaterial;
        
        // Water
        var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 2048, 2048, 16, scene, false);
        var water = new WATERMAT.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
        waterMesh.position.y = -20;
        water.backFaceCulling = true;
        water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);
        water.windForce = -20;
        water.waveHeight = 1.7;
        water.bumpHeight = 0.1;
        water.windDirection = new BABYLON.Vector2(1, 1);
        water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
        water.colorBlendFactor = 0.0;
        water.addToRenderList(skybox);

        waterMesh.material = water;

        //Creates Physics and Meshes
        this.CreatePhysics(scene);

        //Create Camera
        var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", 3.15, 0.62, 20, new BABYLON.Vector3(-27.34, 66.92, 21.5), scene);
        

		camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 40;
        
        //Create Light
        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
		light1.intensity = .7;

        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", false, scene);
        
        var title = new GUI.TextBlock();
        title.text = "Level 0";
        title.fontSize = 54;
        title.color = "white";
        title.top = "-300px";
        title.fontWeight = "600";
        title.zIndex = 10;
        advancedTexture.addControl(title);
        
		// hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
			
			//Change it from this.maze.MoveForward to this.ball.MoveForward for each if statement so you can move the ball and not the platform
            if(ev.keyCode == 87){
                this.maze.MoveForward();
            }
            if(ev.keyCode == 83){
                this.maze.MoveBack();
            }
            if(ev.keyCode == 65){
                this.maze.MoveLeft();
            }
            if(ev.keyCode == 68){
                this.maze.MoveRight();
                // this.maze.RotateRight();
                
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
            // engine.resize();
			//console.log(camera.position);
            if(this.maze.moveTrigger() == true){
                scene.removeMesh(this.ball.sphere);
                this.maze.MoveToNextLevel(scene);
                this.CreateMeshes(scene);
                // console.log("Move to next level");
            }
        });
    }

    async CreatePhysics(scene): Promise<void> {
        const ammo = await Ammo();
        const physics = new AmmoJSPlugin(true,ammo);
        scene.enablePhysics(new Vector3(0,-100,0),physics);
        this.CreateMeshes(scene);
        // var cube = BABYLON.MeshBuilder.CreateBox("cube",{size:10},scene);
        // cube.physicsImpostor = new BABYLON.PhysicsImpostor(cube,PhysicsImpostor.BoxImpostor,{mass:10,friction:1});
        // cube.position = new BABYLON.Vector3(3,10,0);
    }

    CreateMeshes(scene){
        this.ball.CreateBall(scene);
        this.maze.drawMaze(scene);
        this.maze.CreateMaze(scene,this.ball);
    }
    
}
new App();
