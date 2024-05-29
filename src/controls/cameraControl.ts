import * as THREE from "three";
import { UpdateOrbit } from "../utils/types";

export function createControls(camera: THREE.Camera, canvas: HTMLElement) {
  let controls: UpdateOrbit;
  function updating() {
    controls.update();
  }
  controls = new UpdateOrbit(camera, canvas, updating);
  controls.enableDamping = true;

  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;

  controls.listenToKeyEvents(window);

  controls.autoRotate = false;
  controls.autoRotateSpeed = 50;

  controls.minDistance = 100;
  controls.maxDistance = 250;

  return controls;
}
