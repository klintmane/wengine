export let ctx: WebGLRenderingContext;

export class GL {
  static init(elId: string): HTMLCanvasElement {
    const canvas = document.getElementById(elId) as HTMLCanvasElement;
    if (!canvas) {
      throw `Cannot find element: ${elId}`;
    }

    ctx = canvas.getContext("webgl");
    if (!ctx) {
      throw `Cannot find webgl context on element: ${elId}`;
    }

    return canvas;
  }
}
