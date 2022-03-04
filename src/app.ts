import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";
import Ammo from "ammo.js";
import { AmmoJSPlugin, PhysicsImpostor, Vector3 } from "@babylonjs/core";
import { Mazes } from "./mazes";
import { Ball } from "./ball";

class App {
    private ball:Ball = new Ball;
    private maze:Mazes = new Mazes;
    constructor() {
    
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);
        // scene.clearColor = new BABYLON.Color4(0,.4,1); ==> Color for background

        //Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        
        //Creates Physics and Meshes
        this.CreatePhysics(scene);

        var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", 3.15, 0.62, 20, new BABYLON.Vector3(-31, 39.52, 0.8), scene);
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 40;
        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

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

            // if(ev.keyCode == 87){
            //     this.ball.MoveForward();
            // }
            // if(ev.keyCode == 83){
            //     this.ball.MoveBack();
            // }
            // if(ev.keyCode == 65){
            //     this.ball.MoveLeft();
            // }
            if(ev.keyCode == 68){
                // this.ball.MoveRight();
                this.maze.RotateRight();
                
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
            // engine.resize();
        });
    }

    async CreatePhysics(scene): Promise<void> {
        const ammo = await Ammo();
        const physics = new AmmoJSPlugin(true,ammo);
        scene.enablePhysics(new Vector3(0,-10,0),physics);

        this.maze.CreateMaze(scene);
        this.ball.CreateBall(scene);
    }
    
}
new App();