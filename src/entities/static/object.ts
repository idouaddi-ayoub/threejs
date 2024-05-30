import * as THREE from "three";
import { UpdateObject } from "../../utils/types";
import RAPIER from "@dimforge/rapier3d";
import { createFragment } from "../../utils/loader";

export function createCube(world: RAPIER.World) {
  const startPosition = { x: 0, y: 100, z: 0 };
  const cubeGeometry = { x: 10, y: 10, z: 10 };

  const vertices = new THREE.BoxGeometry(
    cubeGeometry.x,
    cubeGeometry.y,
    cubeGeometry.z
  );
  const fragment = createFragment("src/assets/textures/PRIZIDANTE.jpg");
  const radianPerSecond = THREE.MathUtils.degToRad(90);

  const cubeBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(
      startPosition.x,
      startPosition.y,
      startPosition.z
    )
  );
  const cubeShape = RAPIER.ColliderDesc.cuboid(
    cubeGeometry.x / 2,
    cubeGeometry.y / 2,
    cubeGeometry.z / 2
  )
    .setMass(1)
    .setRestitution(1);

  world.createCollider(cubeShape, cubeBody);

  function updated(delta: number) {
    cube.rotation.x += radianPerSecond * delta;

    //const quaternion = new THREE.Quaternion().setFromEuler(cube.rotation);
    //cubeBody.setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w }, true);
  }

  const cube = new UpdateObject(vertices, fragment, updated);
  cube.position.set(startPosition.x, startPosition.y, startPosition.z);

  return { cubeObjectBody: cube, cubePhysicalBody: cubeBody };
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
