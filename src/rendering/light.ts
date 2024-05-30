import * as THREE from "three";

function createLight() {
  const light = new THREE.DirectionalLight("white", 5);
  const ambientLight = new THREE.HemisphereLight("white", "darkslateblue", 0);
  light.position.set(10, 10, 10);

  return { light, ambientLight };
}

export { createLight };
