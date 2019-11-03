import { Buffer } from "/gl";
import { Vector3 } from "/math/vector";

export class Sprite {
  private name: string;
  private width: number;
  private height: number;

  private buffer: Buffer;

  position = new Vector3();

  constructor(name: string, width = 100, height = 100) {
    this.name = name;
    this.width = width;
    this.height = height;

    this.buffer = this.load();
  }

  load = () => {
    const buffer = new Buffer(3); // Create a 3D buffer (x,y,z)

    // location: 0 is hard-coded as the first shader attrib
    const attrib = { location: 0, size: 3, offset: 0 };
    // 2 triangles ((0, 0, 0) (0, .5, 0) (.5, .5, .5)), ((.5, .5, 0) (.5, 0, 0) (0, 0, 0))
    const data = [0, 0, 0, 0, this.width, 0, this.width, this.width, this.width, this.width, this.width, this.width, this.width, 0, 0, 0, 0, 0];

    buffer.addAttributeInfo(attrib);
    buffer.push(data);
    buffer.upload();
    buffer.unbind();

    return buffer;
  };

  update = (time: number) => {};

  draw = () => {
    this.buffer.bind();
    this.buffer.draw();
  };
}
