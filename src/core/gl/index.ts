export let gl: WebGLRenderingContext;

export class GL {
  static init(elId: string): HTMLCanvasElement {
    const canvas = document.getElementById(elId) as HTMLCanvasElement;
    if (!canvas) {
      throw `Cannot find element: ${elId}`;
    }

    gl = canvas.getContext("webgl");
    if (!gl) {
      throw `Cannot find webgl context on element: ${elId}`;
    }

    return canvas;
  }
}

export * from "./buffer";
export * from "./shader";
