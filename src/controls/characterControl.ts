import RAPIER from "@dimforge/rapier3d";

export function setupKeyControls(
  collider: RAPIER.Collider,
  target: RAPIER.RigidBody,
  characterController: RAPIER.KinematicCharacterController,
  speed = 1
) {
  document.addEventListener("keydown", (event) => {
    let newVelocity = target.linvel();

    switch (event.code) {
      //Z
      case "KeyW":
        newVelocity.z -= speed;
        break;
      //S
      case "KeyS":
        newVelocity.z += speed;
        break;
      //Q
      case "KeyA":
        newVelocity.x -= speed;
        break;
      //D
      case "KeyD":
        newVelocity.x += speed;
        break;
      //Space
      case "Space":
        newVelocity.y += speed / 2;
        break;
      //ctrl
      case "ControlLeft":
        newVelocity.y -= speed / 2;
        break;
      default:
        break;
    }

    //gamepad

    characterController.computeColliderMovement(collider, newVelocity);
    const calculatedVelocity = characterController.computedMovement();
    target.setLinvel(calculatedVelocity, true);
  });
}
