import { GL, gl } from "../gl";
import { Shader } from "../gl/shader";
import { Buffer } from "../gl/buffer";

export class Engine {
  private canvas: HTMLCanvasElement;
  private shader: Shader;
  private buffer: Buffer;

  start = (elId: string): void => {
    this.canvas = GL.init(elId);

    this.shader = this.createShader();
    this.buffer = this.createBuffer();
    this.shader.use();

    gl.clearColor(0, 0, 0, 1); // Set the clear screen color
    this.loop();
  };

  resize = (w: number, h: number): void => {
    if (this.canvas) {
      this.canvas.width = w;
      this.canvas.height = h;

      gl.viewport(0, 0, w, h);
    }
  };

  private loop = (): void => {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the screen on every frame

    const colorLoc = this.shader.getUniformLoc("u_color");
    gl.uniform4f(colorLoc, 1, 0.5, 0, 1);

    this.buffer.bind();
    this.buffer.draw();

    requestAnimationFrame(this.loop);
  };

  private createShader = (): Shader => {
    const vertSrc = `
      attribute vec3 a_pos;
    
      void main() {
        gl_Position = vec4(a_pos, 1.0);
      }
    `;

    const fragSrc = `
      precision mediump float;
      uniform vec4 u_color;

      void main() {
        gl_FragColor = u_color;
      }
    `;

    return new Shader("basic", vertSrc, fragSrc);
  };

  private createBuffer = (): Buffer => {
    const buffer = new Buffer(3); // Create a 3D buffer (x,y,z)

    const attribLoc = this.shader.getAttribLoc("a_pos");

    const attrib = { location: attribLoc, size: 3, offset: 0 };
    const data = [0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0.5]; // 3 verticles (0, 0, 0) (0, 0.5, 0) (0.5, 0.5, 0.5)

    buffer.addAttributeInfo(attrib);
    buffer.push(data);
    buffer.upload();
    buffer.unbind();

    return buffer;
  };
}
