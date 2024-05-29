import * as THREE from "three";

function createLight() {
  const light = new THREE.DirectionalLight("white", 5);
  const ambientLight = new THREE.HemisphereLight("blue", "darkslateblue", 5);
  light.position.set(10, 10, 10);

  return { light, ambientLight };
}

export { createLight };
