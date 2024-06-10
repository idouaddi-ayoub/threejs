import * as THREE from "three";
import * as OBJ from "../entities/static/object";
import * as RAPIER from "@dimforge/rapier3d";
import { ThirdPersonCamera } from "../view/camera";
import { gameLoop } from "../utils";
import { Resizer } from "../rendering/resizer";
import { createScene } from "../rendering/scene";
import { createRenderer } from "../rendering/renderer";
import { createLight } from "../rendering/light";
import { loadRobot } from "../assets/components/Xbot";

export class World {
  private camera: ThirdPersonCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private loop: gameLoop;
  private physicalWorld: RAPIER.World;
  private debugMesh: THREE.LineSegments;
  resizer: Resizer;

  constructor(container: Element) {
    const gravity = new RAPIER.Vector3(0.0, -9.81, 0.0);

    this.camera = new ThirdPersonCamera(
      container,
      { x: 0, y: 20, z: 50 },
      50,
      1,
      0.1,
      500
    );

    this.scene = createScene();
    this.renderer = createRenderer();
    this.resizer = new Resizer(container, this.camera, this.renderer);
    this.physicalWorld = new RAPIER.World(gravity);

    const debugGeometry = new THREE.BufferGeometry();
    debugGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(), 3)
    );
    debugGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(), 3)
    );

    const debugMaterial = new THREE.LineBasicMaterial({ vertexColors: true });
    this.debugMesh = new THREE.LineSegments(debugGeometry, debugMaterial);

    this.scene.add(this.debugMesh);
    this.loop = new gameLoop(
      this.camera,
      this.scene,
      this.renderer,
      this.physicalWorld,
      this.debugMesh
    );

    container.appendChild(this.renderer.domElement);
  }

  async begin() {
    const { model } = await loadRobot();
    this.scene.add(model);

    const { light, ambientLight } = createLight();
    const { groundMesh, axesHelper, gridHelper, groundBody } = OBJ.createPlane(
      this.physicalWorld
    );
    this.scene.add(groundMesh, axesHelper, gridHelper);

    const { cubeObjectBody, cubePhysicalBody } = OBJ.createCube(
      this.physicalWorld
    );
    const { sphereObjectBody, spherePhysicalBody } = OBJ.createSpehere(
      this.physicalWorld
    );

    this.camera.addTarget(model);

    this.scene.add(light, ambientLight, cubeObjectBody, sphereObjectBody);

    this.loop.initiateUpdatables([
      {
        objectBody: this.camera,
      },
      {
        physicalBody: groundBody,
        objectBody: groundMesh,
      },
      {
        physicalBody: cubePhysicalBody,
        objectBody: cubeObjectBody,
      },
      {
        physicalBody: spherePhysicalBody,
        objectBody: sphereObjectBody,
      },
      {
        objectBody: model,
      },
    ]);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
