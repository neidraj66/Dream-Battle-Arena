class BabylonUI extends UI {
  constructor() {
    super();
    this.canvas = document.getElementById("main-canvas"); // Get the canvas element
    this.engine = new BABYLON.Engine(this.canvas, true);
  }
  drawDungeon() {
    this.createScene();
  }
  // from: https://www.babylonjs-playground.com/#2CTVPP#12
  createScene() {
    var scene = new BABYLON.Scene(this.engine);

    //Adding a light
    //   var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
    // var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    //scene.createDefaultEnvironment();

    var hdrTexture = new BABYLON.CubeTexture(
      "ui/babylon/textures/room.env",
      scene
    );
    hdrTexture.gammaSpace = false;

    scene.environmentTexture = hdrTexture;

    // light1
    var direction = new BABYLON.Vector3(-4.5, -1, 1);
    var light = new BABYLON.DirectionalLight("dir01", direction, scene);
    light.position = new BABYLON.Vector3(-30, 20, -35);

    var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere.position = light.position;
    light.intensity = 0.0;

    var myPoints = [lightSphere.position, direction];
    var lines = BABYLON.MeshBuilder.CreateLines(
      "lines",
      { points: myPoints },
      scene
    );

    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.1;

    var light2 = new BABYLON.DirectionalLight(
      "DirectionalLight2",
      new BABYLON.Vector3(0, -1, -2),
      scene
    );
    light2.diffuse = new BABYLON.Color3(0, 0.1, 1);
    //scene.clearColor = new BABYLON.Color3(1,0.5,1);

    light2.intensity = 0.0;

    var direction3 = new BABYLON.Vector3(-1, -1, -1);
    var light3 = new BABYLON.DirectionalLight(
      "DirectionalLight3",
      direction3,
      scene
    );
    light3.position = new BABYLON.Vector3(52, 20, -35);

    var lightSphere3 = BABYLON.Mesh.CreateSphere("sphere3", 10, 2, scene);
    lightSphere3.position = light3.position;

    light3.diffuse = new BABYLON.Color3(1, 1, 0.5);
    light3.intensity = 0.0;

    var myPoints3 = [lightSphere3.position, direction3];

    var lines3 = BABYLON.MeshBuilder.CreateLines(
      "lines",
      { points: myPoints3 },
      scene
    );

    // Create light
    var light4 = new BABYLON.SpotLight(
      "spotLight",
      new BABYLON.Vector3(0, 30, -10),
      new BABYLON.Vector3(0, 1, 0),
      Math.PI / 1,
      1,
      scene
    );

    light4.intensity = 0.0;
    var lightSphere4 = BABYLON.Mesh.CreateSphere("sphere4", 10, 2, scene);
    light4.position = new BABYLON.Vector3(-1, 3, 10);
    lightSphere4.position = light4.position;

    // Parameters: name, position, scene
    var camera = new BABYLON.FollowCamera(
      "FollowCam",
      new BABYLON.Vector3(0, 10, -10),
      scene
    );

    // The goal distance of camera from target
    camera.radius = 10;

    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 2;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 2;

    // Acceleration of camera in moving from current to goal position
    camera.cameraAcceleration = 0.005;

    // The speed at which acceleration is halted
    camera.maxCameraSpeed = 10;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);

    /*
            var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "ui/babylon/textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
            var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("ui/babylon/textures/ground.jpg", scene);
            groundMaterial.diffuseTexture.uScale = 6;
            groundMaterial.diffuseTexture.vScale = 6;
            groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            ground.position.y = -2.05;
            ground.material = groundMaterial;
        */

    var skybox = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 10000.0 },
      scene
    );
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "ui/babylon/textures/skybox",
      scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 1);
    skybox.material = skyboxMaterial;

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    var shadowGenerator3 = new BABYLON.ShadowGenerator(1024, light3);
    var shadowGenerator4 = new BABYLON.ShadowGenerator(1024, light4);
    // ground.receiveShadows = true;

    // Torus
    var torus = BABYLON.Mesh.CreateTorus("torus", 4, 2, 30, scene, false);
    torus.position = new BABYLON.Vector3(33, 10, -6);
    shadowGenerator.getShadowMap().renderList.push(torus);
    shadowGenerator3.getShadowMap().renderList.push(torus);
    shadowGenerator.getShadowMap().renderList.push(lightSphere4);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh(
      "",
      "https://raw.githubusercontent.com/eldinor/ForBJS/master/",
      "Dungeon.glb",
      scene,
      function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        var d1 = newMeshes[0];
        var root = scene.getMeshByName("__root__");
        console.log(root);
        console.log("newMeshes = " + newMeshes);

        for (var index = 0; index < newMeshes.length; index++) {
          shadowGenerator.getShadowMap().renderList.push(newMeshes[index]);
          newMeshes[index].receiveShadows = true;
          shadowGenerator2.getShadowMap().renderList.push(newMeshes[index]);
          shadowGenerator3.getShadowMap().renderList.push(newMeshes[index]);
          shadowGenerator4.getShadowMap().renderList.push(newMeshes[index]);
          newMeshes[index].receiveShadows = true;
          console.log(scene.getMaterialByID());
        }

        var textscaling = 10;
        var floor = scene.getMaterialByID("FloorBase.001");
        var textureFloor = new BABYLON.Texture(
          "ui/babylon/textures/floor.png",
          scene
        );
        textureFloor.uScale = textscaling;
        textureFloor.vScale = textscaling;
        floor.albedoTexture = textureFloor;

        var textureFloorBump = new BABYLON.Texture(
          "ui/babylon/textures/floor_bump.PNG",
          scene
        );
        floor.bumpTexture = textureFloorBump;
        textureFloorBump.uScale = textscaling;
        textureFloorBump.vScale = textscaling;

        scene.getMaterialByID("ChainBase").albedoColor = new BABYLON.Color3(
          0.5,
          0.25,
          0
        );
        scene.getMaterialByID("ChainBase").albedoTexture = textureFloor;

        scene.getMaterialByID("WallBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/ground.jpg",
          scene
        );
        scene.getMaterialByID("WallBase").bumpTexture = new BABYLON.Texture(
          "ui/babylon/textures/floor_bump.PNG",
          scene
        );

        scene.getMaterialByID(
          "ChainBase"
        ).emissiveTexture = new BABYLON.Texture(
          "https://raw.githubusercontent.com/eldinor/ForBJS/master/spider_webs_compressed.jpg",
          scene
        );
        scene.getMaterialByID("ChainBase").emissiveColor = new BABYLON.Color3(
          0.5,
          1,
          0
        );

        scene.getMaterialByID("FloorBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/grass.jpg",
          scene
        );
        //scene.getMaterialByID("FloorBase").albedoTexture.vAng=1.5;

        scene.getMaterialByID(
          "WallPillarbase"
        ).albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/ground.jpg",
          scene
        );

        scene.getMaterialByID(
          "UpperWallBase"
        ).albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/floor.png",
          scene
        );
        scene.getMaterialByID("UpperWallBase").albedoTexture.uScale = 8;
        scene.getMaterialByID(
          "UpperWallBase"
        ).bumpTexture = new BABYLON.Texture(
          "ui/babylon/textures/normalMap.jpg",
          scene
        );
        scene.getMaterialByID("UpperWallBase").bumpTexture.uScale = 8;
        scene.getMaterialByID("UpperWallBase").bumpTexture.vScale = 8;
        scene.getMaterialByID(
          "UpperWallBase"
        ).emissiveTexture = new BABYLON.Texture(
          "https://raw.githubusercontent.com/eldinor/ForBJS/master/spider_webs_compressed.jpg",
          scene
        );
        scene.getMaterialByID(
          "UpperWallBase"
        ).emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        scene.getMaterialByID("UpperWallBase").emissiveTexture.uScale = 2;

        scene.getMaterialByID(
          "WallPillarbase"
        ).emissiveTexture = new BABYLON.Texture(
          "https://raw.githubusercontent.com/eldinor/ForBJS/master/spider_webs_compressed.jpg",
          scene
        );
        scene.getMaterialByID(
          "WallPillarbase"
        ).emissiveColor = new BABYLON.Color3(1, 0.2, 0.2);

        scene.getMaterialByID("WoodBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/fire.jpg",
          scene
        );
        scene.getMaterialByID("WoodBase").emissiveTexture = new BABYLON.Texture(
          "https://raw.githubusercontent.com/eldinor/ForBJS/master/spider_webs_compressed.jpg",
          scene
        );
        scene.getMaterialByID("WoodBase").emissiveColor = new BABYLON.Color3(
          0.5,
          1,
          1
        );
        var woodScale = (scene.getMaterialByID(
          "WoodBase"
        ).emissiveTexture.uScale = 2);

        scene.getMaterialByID("CarpetBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/grass.dds",
          scene
        );

        scene.getMaterialByID("GreyBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/reflectivity.png",
          scene
        );
        scene.getMaterialByID("GreyBase").metallicTexture = new BABYLON.Texture(
          "ui/babylon/textures/reflectivity.png",
          scene
        );

        scene.getMaterialByID("FloorBase").albedoTexture = new BABYLON.Texture(
          "ui/babylon/textures/sand.jpg",
          scene
        );
        scene.getMaterialByID("FloorBase").albedoTexture.uScale = 1;
        scene.getMaterialByID("FloorBase").bumpTexture = new BABYLON.Texture(
          "ui/babylon/textures/normal.png",
          scene
        );
        scene.getMaterialByID("FloorBase").bumpTexture.uScale = 1;
      }
    );

    // Create rendering pipeline
    var pipeline = new BABYLON.StandardRenderingPipeline(
      "standard",
      scene,
      1.0,
      null,
      [camera]
    );
    //   pipeline.lensTexture = pipeline.lensFlareDirtTexture = new BABYLON.Texture("ui/babylon/textures/lensflaredirt.png", scene);

    // Activating pseudo lens flare effect
    pipeline.LensFlareEnabled = true;
    // The strength of the final result of the pseudo lens flare effect
    pipeline.lensFlareStrength = 5; // By default 1.0
    // Sets the width of the halo used to render the pseudo lens flare effect
    pipeline.lensFlareHaloWidth = 1; // By default 0.4;

    pipeline.lensStarTexture = new BABYLON.Texture(
      "ui/babylon/textures/lensstar.png",
      scene
    );
    pipeline.lensColorTexture = new BABYLON.Texture(
      "ui/babylon/textures/lenscolor.png",
      scene
    );
    /*
        pipeline.brightThreshold = 0.8;
        pipeline.exposure = 2.0; // which multiplies the final scene color with the highlighted surfaces result
        pipeline.blur =256;
        pipeline.BloomEnabled = true;
        
            pipeline.VLSEnabled = true;
            pipeline.sourceLight = light;
            pipeline.volumetricLightPower = 4;
            pipeline.volumetricLightStepsCount = 50;
            pipeline.volumetricLightCoefficient = 0.05;
        /*
            pipeline.lensFlareHaloWidth = 0.4;
            pipeline.lensFlareGhostDispersal = 0.1;
        pipeline.lensFlareStrength = 2; // By default 1.0
        */

    /*
        // Enable motion blur in the pipeline
        pipeline.MotionBlurEnabled = true;
        
        // Default value is 1.0. More the motion strength is high, more the blur will be high
        pipeline.motionStrength = 0.5;
        
        // Default value is 64.0. This property represents the quality of the effect. More the value is high
        // more the blur will be high quality. 64.0 is enough to have a beautiful result
        pipeline.motionBlurSamples = 32.0;
        
        
        */

    var alpha = 0;
    scene.registerBeforeRender(function () {
      light.position = new BABYLON.Vector3(
        12 * Math.sin(alpha),
        2,
        12 * Math.cos(alpha)
      );

      lightSphere.position = light.position;
      gl.intensity += Math.sin(alpha) / 200;
      alpha += 0.01;
    });

    camera.lockedTarget = lightSphere;

    return scene;
  }
}
