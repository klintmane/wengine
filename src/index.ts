import { Engine } from "./core";

let engine: Engine;

const load = () => {
  engine = new Engine();
  engine.start("c");
  resize(); // TODO: Remove in the future
};

const resize = () => {
  engine.resize(window.innerWidth, window.innerHeight);
};

window.onload = load;
window.onresize = resize;
