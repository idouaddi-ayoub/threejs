import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d";

type Updatable = {
  physicalBody?: RAPIER.RigidBody;
  objectBody: any;
  collider?: RAPIER.Collider;
  characterController?: RAPIER.KinematicCharacterController;
};

export class gameLoop {
  private readonly clock: THREE.Clock = new THREE.Clock();
  private updatables: Updatable[] = [];

  constructor(
    private readonly camera: THREE.PerspectiveCamera,
    private readonly scene: THREE.Scene,
    private readonly renderer: THREE.WebGLRenderer,
    private readonly physicalWorld: RAPIER.World,
    private readonly debugMesh: THREE.LineSegments
  ) {}

  /*----------------------------Updatable-----------------------------*/
  initiateUpdatables(updatables: Updatable[]) {
    this.updatables = updatables;
  }

  addUpdatable(updatable: Updatable) {
    this.updatables.push(updatable);
  }

  /*----------------------------Rendering-----------------------------*/
  start() {
    this.renderer.setAnimationLoop(() => {
      this.updating();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }
  /*------------------------------------------------------------------*/

  updating() {
    this.physicalWorld.step();

    const delta = this.clock.getDelta();
    for (let i = 0; this.updatables.length > i; i++) {
      if (!this.updatables[i].physicalBody) {
        this.updatables[i].objectBody.updating(delta);
        continue;
      }

      if (this.updatables[i].characterController) {
        let newVelocity = this.updatables[i].physicalBody!.linvel();
        newVelocity.y -= 9.81 * delta * 0.5;
        this.updatables[i].characterController!.computeColliderMovement(
          this.updatables[i].collider!,
          newVelocity
        );
        const calculatedVelocity =
          this.updatables[i].characterController!.computedMovement();
        this.updatables[i].physicalBody!.setLinvel(calculatedVelocity!, true);
      }

      this.updatables[i].objectBody.position.copy(
        this.updatables[i].physicalBody?.translation()
      );

      this.updatables[i].objectBody.quaternion.copy(
        this.updatables[i].physicalBody?.rotation()
      );

      this.updatables[i].objectBody.updating(delta);
    }

    const debugRender = this.physicalWorld.debugRender();
    const { vertices, colors } = debugRender;

    if (vertices.length && colors.length) {
      this.debugMesh.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      this.debugMesh.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      this.debugMesh.geometry.attributes.position.needsUpdate = true;
      this.debugMesh.geometry.attributes.color.needsUpdate = true;
    }
  }
}
