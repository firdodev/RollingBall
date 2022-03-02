import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { MeshEmitterGridComponent } from "@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/particleSystems/meshEmitterGridComponent";

class App {
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
        scene.clearColor = new BABYLON.Color4(0,.4,1);

        var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", 3.15, 0.62, 10, new BABYLON.Vector3(-31, 39.52, 0.8), scene);
        camera.attachControl(canvas, true);
        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        
        // Ammo();
        // scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.AmmoJSPlugin());

        var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
        sphere.position.y = 3;

        var brick = new BABYLON.StandardMaterial("myMaterial", scene);
        brick.diffuseTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_Color.jpg", scene);
        brick.ambientTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_AmbientOcclusion.jpg", scene);
        brick.bumpTexture = new BABYLON.Texture("textures/Bricks/Bricks075A_2K_NormalDX.jpg", scene);

        var maze = BABYLON.SceneLoader.ImportMesh("","models/","maze01.babylon",scene,

            function (meshes) {
                meshes[0].position.x = 0;
                meshes[1].position.x = 0;
                meshes[2].position.x = 0;
                meshes[3].position.x = 0;
                meshes[4].position.x = 0;

                meshes[0].material = brick;
                meshes[1].material = brick;
                meshes[2].material = brick;
                meshes[3].material = brick;
                meshes[4].material = brick;


            }

        );
        
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
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
            engine.resize();
        });
    }
}
new App();