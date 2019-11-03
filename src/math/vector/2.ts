export class Vector2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  toArray = () => [this.x, this.y];

  toFloat32Array = () => new Float32Array(this.toArray());
}
