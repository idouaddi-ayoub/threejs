import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { AnimationMixer, Vector3 } from "three";

async function loadRobot() {
  const loader = new GLTFLoader();

  const loaderData = await loader.loadAsync(
    "src/assets/models/animations/RobotExpressive.glb"
  );

  const model: any = loaderData.scene;
  const clip = loaderData.animations[10];
  const mixer = new AnimationMixer(model);

  const action = mixer.clipAction(clip);

  action.play();
  console.log(mixer);

  model.updating = (delta: number) => {
    mixer.update(delta);
    model.rotateOnAxis(new Vector3(0, 1, 0), 0.1);
  };

  return { model };
}

export { loadRobot };
