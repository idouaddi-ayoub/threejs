import * as THREE from "three";

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  return renderer;
}
