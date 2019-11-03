export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toArray = () => [this.x, this.y, this.z];

  toFloat32Array = () => new Float32Array(this.toArray());
}
