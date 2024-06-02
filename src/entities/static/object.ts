import * as THREE from "three";
import { UpdateObject } from "../../utils/types";
import RAPIER from "@dimforge/rapier3d";
import { createFragment } from "../../utils/loader";
import { setupKeyControls } from "../../controls/characterControl";

export function createCube(world: RAPIER.World) {
  const startPosition = { x: 100, y: 0, z: 0 };
  const cubeGeometry = { x: 10, y: 10, z: 10 };

  const vertices = new THREE.BoxGeometry(
    cubeGeometry.x,
    cubeGeometry.y,
    cubeGeometry.z
  );
  const fragment = createFragment("src/assets/textures/PRIZIDANTE.jpg");

  const cubeBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setLinvel(0, 0, 0)
      .setAngvel({ x: 0, y: 0, z: 0 })
      .setTranslation(startPosition.x, startPosition.y, startPosition.z)
  );

  const cubeShape = RAPIER.ColliderDesc.cuboid(
    cubeGeometry.x / 2,
    cubeGeometry.y / 2,
    cubeGeometry.z / 2
  )
    .setMass(1)
    .setRestitution(1);

  world.createCollider(cubeShape, cubeBody);

  world.createCharacterController(0.000001);

  function updated(delta: number) {
    //cube.rotation.x += THREE.MathUtils.degToRad(90) * delta;
  }

  const cube = new UpdateObject(vertices, fragment, updated);
  cube.position.set(startPosition.x, startPosition.y, startPosition.z);

  return { cubeObjectBody: cube, cubePhysicalBody: cubeBody };
}

export function createSpehere(world: RAPIER.World) {
  const startPosition = { x: 0, y: 100, z: 0 };
  const sphereGeometry = { x: 10, y: 10, z: 10 };

  const vertices = new THREE.SphereGeometry(sphereGeometry.x);
  const fragment = createFragment("src/assets/textures/PRIZIDANTE.jpg");

  const sphereBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setLinvel(0, 0, 0)
      .setAngvel({ x: 0, y: 0, z: 0 })
      .setTranslation(startPosition.x, startPosition.y, startPosition.z)
  );

  const sphereShape = RAPIER.ColliderDesc.ball(sphereGeometry.x)
    .setMass(1)
    .setRestitution(1);

  const sphereCollider = world.createCollider(sphereShape, sphereBody);

  const characterController = world.createCharacterController(0.000001);
  characterController.setApplyImpulsesToDynamicBodies(false);
  setupKeyControls(sphereCollider, sphereBody, characterController);

  function updated(delta: number) {
    //sphere.rotation.x += THREE.MathUtils.degToRad(90) * delta;
  }

  const sphere = new UpdateObject(vertices, fragment, updated);
  sphere.position.set(startPosition.x, startPosition.y, startPosition.z);

  return { sphereObjectBody: sphere, spherePhysicalBody: sphereBody };
}

export function createPlane(world: RAPIER.World) {
  const cubeGeometry = new THREE.BoxGeometry(500, 1, 500);

  const material = new THREE.MeshPhongMaterial();

  const groundMesh = new UpdateObject(cubeGeometry, material, () => {});
  groundMesh.position.y = -1;

  const groundBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(0, -1, 0)
  );
  const groundShape = RAPIER.ColliderDesc.cuboid(250, 0.5, 250);
  world.createCollider(groundShape, groundBody);

  const axesHelper = new THREE.AxesHelper(250);

  const gridHelper = new THREE.GridHelper(500, 100);
  return { groundMesh, groundBody, groundShape, axesHelper, gridHelper };
}
