import { gl } from "./index";

type AttribLocs = { [name: string]: number };
type UniformLocs = { [name: string]: WebGLUniformLocation };

export class Shader {
  name: string;
  private program;
  private attributes: AttribLocs;
  private uniforms: UniformLocs;

  constructor(name: string, vertSrc: string, fragSrc: string) {
    this.name = name;

    const vert = this.createShader(vertSrc, gl.VERTEX_SHADER);
    const frag = this.createShader(fragSrc, gl.FRAGMENT_SHADER);
    this.program = this.createProgram(vert, frag);

    this.attributes = this.saveAttribLocs();
    this.uniforms = this.saveUniformLocs();
  }

  private createShader = (src: string, type: number): WebGLShader => {
    let shader: WebGLShader = gl.createShader(type);

    gl.shaderSource(shader, src); // Add src to shader
    gl.compileShader(shader); // Compile the shader

    const error = gl.getShaderInfoLog(shader);
    if (error) {
      throw `Error loading shader ${this.name}: ${error}`;
    }

    return shader;
  };

  private createProgram = (vert: WebGLShader, frag: WebGLShader): WebGLProgram => {
    const program = gl.createProgram();

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    const error = gl.getProgramInfoLog(program);
    if (error) {
      throw `Error creating program ${program}: ${error}`;
    }

    return program;
  };

  // For each program attributes, saves a reference of the location to this.attributes
  private saveAttribLocs = (): AttribLocs => {
    const attribs = {};
    let count = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < count; ++i) {
      const info: WebGLActiveInfo = gl.getActiveAttrib(this.program, i);
      if (!info) {
        break;
      }
      attribs[info.name] = gl.getAttribLocation(this.program, info.name);
    }

    return attribs;
  };

  private saveUniformLocs = (): UniformLocs => {
    const uniforms = {};
    let count = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < count; ++i) {
      const info: WebGLActiveInfo = gl.getActiveUniform(this.program, i);
      if (!info) {
        break;
      }
      uniforms[info.name] = gl.getUniformLocation(this.program, info.name);
    }

    return uniforms;
  };

  getAttribLoc = (name: string): number => {
    const loc = this.attributes[name];
    if (loc == undefined) {
      throw `Cannot find attribute: ${name} in shader: ${this.name}`;
    }
    return loc;
  };

  getUniformLoc = (name: string): WebGLUniformLocation => {
    const loc = this.uniforms[name];
    if (loc == undefined) {
      throw `Cannot find uniform: ${name} in shader: ${this.name}`;
    }
    return loc;
  };

  use = (): void => {
    gl.useProgram(this.program);
  };
}
