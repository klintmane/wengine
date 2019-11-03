import { gl } from "/gl";

export class Texture {
  name: string;
  width: number;
  height: number;
  loaded = false;
  private texture: WebGLTexture;

  constructor(name: string, width = 1, height = 1) {
    this.name = name;
    this.width = width;
    this.height = height;

    this.texture = gl.createTexture();
    this.bind();
  }

  bind = () => {
    gl.bindTexture(gl.TEXTURE_2D, this.handle);
  };

  handle = () => {};
}
