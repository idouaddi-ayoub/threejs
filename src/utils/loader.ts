import * as THREE from "three";

export const WIDTH = 2;

function createFragment(path: string) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(path);

  const fragment = new THREE.MeshStandardMaterial({
    color: "white",
    map: texture,
    wireframe: false,
  });

  return fragment;
}

function createMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: "red",
    flatShading: true,
  });
  return material;
}

export { createFragment };
export { createMaterial };
