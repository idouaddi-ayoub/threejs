import RAPIER from "@dimforge/rapier3d";

export function setupKeyControls(
  collider: RAPIER.Collider,
  target: RAPIER.RigidBody,
  characterController: RAPIER.KinematicCharacterController,
  speed = 1
) {
  let wDown = false;
  let aDown = false;
  let sDown = false;
  let dDown = false;

  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyW":
        wDown = true;
        break;
      case "KeyA":
        aDown = true;
        break;
      case "KeyS":
        sDown = true;
        break;
      case "KeyD":
        dDown = true;
        break;
      default:
        break;
    }

    let newVelocity = target.linvel();

    if (wDown && dDown) {
      newVelocity.z -= speed / Math.sqrt(2);
      newVelocity.x += speed / Math.sqrt(2);
    } else if (wDown && aDown) {
      newVelocity.z -= speed / Math.sqrt(2);
      newVelocity.x -= speed / Math.sqrt(2);
    } else if (sDown && dDown) {
      newVelocity.z += speed / Math.sqrt(2);
      newVelocity.x += speed / Math.sqrt(2);
    } else if (sDown && aDown) {
      newVelocity.z += speed / Math.sqrt(2);
      newVelocity.x -= speed / Math.sqrt(2);
    } else {
      switch (event.code) {
        case "KeyW":
          newVelocity.z -= speed;
          break;
        case "KeyS":
          newVelocity.z += speed;
          break;
        case "KeyA":
          newVelocity.x -= speed;
          break;
        case "KeyD":
          newVelocity.x += speed;
          break;
        case "Space":
          newVelocity.y += speed / 2;
          break;
        case "ControlLeft":
          newVelocity.y -= speed / 2;
          break;
        default:
          break;
      }
    }

    characterController.computeColliderMovement(collider, newVelocity);
    const calculatedVelocity = characterController.computedMovement();
    target.setLinvel(calculatedVelocity, true);
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyW":
        wDown = false;
        break;
      case "KeyA":
        aDown = false;
        break;
      case "KeyS":
        sDown = false;
        break;
      case "KeyD":
        dDown = false;
        break;
      default:
        break;
    }
  });
}
