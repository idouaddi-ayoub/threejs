import * as THREE from "three";

function createScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color("gray");

  return scene;
}

export { createScene };
