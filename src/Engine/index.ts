import { GL, ctx } from "../GL";

export class Engine {
  private count: number = 0;
  private canvas: HTMLCanvasElement;

  constructor() {}

  start = (elId: string): void => {
    this.canvas = GL.init(elId);
    ctx.clearColor(0, 0, 0, 1); // Set the clear screen color
    this.loop();
  };

  private loop = (): void => {
    ctx.clear(ctx.COLOR_BUFFER_BIT); // Clear the screen on every frame
    requestAnimationFrame(this.loop);
  };
}
