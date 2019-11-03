import { gl } from "/gl";

type AttribInfo = { location: number; size: number; offset: number };

export class Buffer {
  private type: number;
  private mode: number;
  private stride: number;
  private buffer: WebGLBuffer;

  private items: number[] = [];
  private itemSize: number;
  private itemType: number;
  private itemTypeSize: number;

  private attribInfo: AttribInfo[] = [];

  /**
   * Creates a WebGL Buffer
   * @param itemSize The size of each element
   * @param itemType The type of each element
   * @param type The type of the buffer, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER
   * @param mode The drawing mode of the buffer, either TRIANGLES or LINES
   */
  constructor(itemSize: number, itemType = gl.FLOAT, type = gl.ARRAY_BUFFER, mode = gl.TRIANGLES) {
    this.type = type;
    this.mode = mode;

    this.itemSize = itemSize;
    this.itemType = itemType;
    this.itemTypeSize = typeSize(itemType);

    this.stride = this.itemSize * this.itemTypeSize;
    this.buffer = gl.createBuffer();
  }

  /**
   * Binds the buffer to the WebGL context
   * @param normalized Indicates if data should be normalized
   */
  bind = (normalized = false) => {
    gl.bindBuffer(this.type, this.buffer);

    for (const a of this.attribInfo) {
      gl.vertexAttribPointer(a.location, a.size, this.itemType, normalized, this.stride, a.offset * this.itemTypeSize);
      gl.enableVertexAttribArray(a.location);
    }
  };

  /**
   * Unbinds the buffer from the WebGL context
   */
  unbind = () => {
    gl.bindBuffer(this.type, undefined);

    for (const a of this.attribInfo) {
      gl.disableVertexAttribArray(a.location);
    }
  };

  /**
   * Pushes some data to the buffer
   * @param items The items/data to be pushed to the buffer
   */
  push = (items: number[]) => {
    this.items = [...this.items, ...items];
  };

  /**
   * Uploads the buffer data to the GPU
   */
  upload = () => {
    gl.bindBuffer(this.type, this.buffer);
    gl.bufferData(this.type, typeData(this.itemType, this.items), gl.STATIC_DRAW);
  };

  /**
   * Adds information about an attribute to the buffer
   */
  addAttributeInfo = (info: AttribInfo) => {
    this.attribInfo.push(info);
  };

  /**
   * Draws the buffer
   */
  draw = () => {
    switch (this.type) {
      case gl.ARRAY_BUFFER:
        return gl.drawArrays(this.mode, 0, this.items.length / this.itemSize);
      case gl.ELEMENT_ARRAY_BUFFER:
        return gl.drawElements(this.mode, this.items.length, this.itemType, 0);
    }
  };

  destroy = () => {
    gl.deleteBuffer(this.buffer);
  };
}

const typeSize = (type: number) => {
  switch (type) {
    case gl.FLOAT:
    case gl.INT:
    case gl.UNSIGNED_INT:
      return 4;
    case gl.SHORT:
    case gl.UNSIGNED_SHORT:
      return 2;
    case gl.BYTE:
    case gl.UNSIGNED_BYTE:
      return 1;
    default:
      throw `Cannot find type size for type: ${type}`;
  }
};

const typeData = (type: number, data: number[]) => {
  switch (type) {
    case gl.FLOAT:
      return new Float32Array(data);
    case gl.INT:
      return new Int32Array(data);
    case gl.UNSIGNED_INT:
      return new Uint32Array(data);
    case gl.SHORT:
      return new Int16Array(data);
    case gl.UNSIGNED_SHORT:
      return new Uint16Array(data);
    case gl.BYTE:
      return new Int8Array(data);
    case gl.UNSIGNED_BYTE:
      return new Uint8Array(data);
    default:
      throw `Cannot create data for type: ${type}`;
  }
};
