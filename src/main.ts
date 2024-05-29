import { World } from "./World/world";

async function main() {
  const container = document.querySelector("#root");

  if (!container) return;

  // 1. Create an instance of the World app
  const world = new World(container);

  await world.begin();

  world.start();
}

main().catch((err) => {
  console.error(err);
});
