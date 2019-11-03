import { GL, gl, Shader } from "/gl";
import { Sprite } from "/graphics";
import { Matrix4 } from "/math";

export class Engine {
  private canvas: HTMLCanvasElement;
  private shader: Shader;
  private projection: Matrix4;

  private sprite: Sprite;

  start = (elId: string) => {
    this.canvas = GL.init(elId);

    this.shader = this.createShader();
    this.shader.use();

    // load
    this.projection = Matrix4.orthographic(0, this.canvas.width, 0, this.canvas.height, -1, 100);
    this.sprite = new Sprite("test");
    this.sprite.position.x = 200;

    gl.clearColor(0, 0, 0, 1); // Set the clear screen color
    this.loop();
  };

  resize = (w: number, h: number) => {
    if (this.canvas) {
      this.canvas.width = w;
      this.canvas.height = h;

      gl.viewport(-1, 1, 1, -1); // Normalized Device Coordinates, the projection will do the rest
    }
  };

  private loop = () => {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the screen on every frame

    const colorLoc = this.shader.getUniformLoc("u_color");
    gl.uniform4f(colorLoc, 1, 0.5, 0, 1);

    // draw
    const projectionLoc = this.shader.getUniformLoc("u_projection");
    gl.uniformMatrix4fv(projectionLoc, false, new Float32Array(this.projection.data)); // Pass the projection data to the uniform

    const modelLoc = this.shader.getUniformLoc("u_model");
    gl.uniformMatrix4fv(modelLoc, false, new Float32Array(Matrix4.translate(this.sprite.position).data)); // Pass the projection data to the uniform

    this.sprite.draw();

    requestAnimationFrame(this.loop);
  };

  private createShader = () => {
    const vertSrc = `
      attribute vec3 a_position;
      uniform mat4 u_projection;
      uniform mat4 u_model;
    
      void main() {
        gl_Position = u_projection * u_model * vec4(a_position, 1.0);
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
}
