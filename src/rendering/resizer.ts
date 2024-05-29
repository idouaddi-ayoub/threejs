import * as THREE from "three";
// import { Camera } from "../view/camera";

export class Resizer {
  constructor(
    private readonly container: Element,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly renderer: THREE.WebGLRenderer
  ) {
    this.setSize();

    window.addEventListener("resize", () => {
      this.setSize();
      this.onResize();
    });
  }
  setSize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  onResize() {}
}
