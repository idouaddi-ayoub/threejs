import * as THERE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

export class UpdateObject<
  TGeometry extends THERE.BufferGeometry = THERE.BufferGeometry,
  TMaterial extends THERE.Material | THERE.Material[] =
    | THERE.Material
    | THERE.Material[]
> extends THERE.Mesh {
  constructor(
    geometry: TGeometry,
    material: TMaterial,
    public readonly updating: (delta: number) => void
  ) {
    super(geometry, material);
  }
}

export class UpdateOrbit extends OrbitControls {
  constructor(
    camera: THERE.Camera,
    element: HTMLElement,
    public readonly updating: (delta: number) => void
  ) {
    super(camera, element);
  }
}

export class updateGLTFLoader extends GLTFLoader {
  constructor(public readonly updating: (delta: number) => void) {
    super();
  }
}
