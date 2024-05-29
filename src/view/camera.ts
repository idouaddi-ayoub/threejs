import * as THREE from "three";

export class Camera extends THREE.PerspectiveCamera {
  private target: THREE.Object3D | null = null;
  constructor(
    container: Element,
    private readonly offset: { x: number; y: number; z: number },
    fov?: number,
    aspect?: number,
    near?: number,
    far?: number
  ) {
    super(fov, aspect, near, far);
    this.aspect = container.clientWidth / container.clientHeight;
  }

  addTarget(target: THREE.Object3D) {
    this.target = target;
  }

  updating() {
    if (!this.target) return;
    this.position.set(
      (this.target.position.x = this.offset.x),
      (this.target.position.y = this.offset.y),
      (this.target.position.z = this.offset.z)
    );
    this.lookAt(this.target.position);
  }
}
