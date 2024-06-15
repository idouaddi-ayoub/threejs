import { GLTFLoader } from "three/examples/jsm/Addons.js";
import RAPIER from "@dimforge/rapier3d";
import { setupKeyControls } from "../../controls/characterControl";

async function loadRobot(world: RAPIER.World) {
  const startPosition = { x: 0, y: 10, z: 0 };

  const capsuleBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.kinematicVelocityBased()
      .setLinvel(0, -9.81, 0)
      .setTranslation(startPosition.x, startPosition.y, startPosition.z)
  );

  const capsuleShape = RAPIER.ColliderDesc.capsule(2, 1)
    .setMass(1)
    .setRestitution(0);

  const capsuleCollider = world.createCollider(capsuleShape, capsuleBody);
  const characterController = world.createCharacterController(0.000001);
  setupKeyControls(capsuleCollider, capsuleBody, characterController);

  capsuleShape.setActiveCollisionTypes(
    RAPIER.ActiveCollisionTypes.DEFAULT |
      RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED
  );
  characterController.setApplyImpulsesToDynamicBodies(false);

  const loader = new GLTFLoader();
  const loaderData = await loader.loadAsync(
    "src/assets/models/3d/untitled.glb"
  );

  console.log(loaderData);

  //fix the type
  const robot: any = loaderData.scene;

  // const clip = loaderData.animations[0];
  // const mixer = new AnimationMixer(robot);

  // const action = mixer.clipAction(clip);

  // action.play();
  robot.scale.set(3, 3, 3);

  robot.updating = (delta: number) => {
    // mixer.update(delta);
    // robot.rotateOnAxis(new Vector3(0, 1, 0), 0.1);
  };

  return {
    robotObjectBody: robot,
    robotPhysicalBody: capsuleBody,
    robotCharacterController: characterController,
    robotCollider: capsuleCollider,
  };
}

export { loadRobot };
