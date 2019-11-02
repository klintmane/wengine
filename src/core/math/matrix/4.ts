import { Vector3 } from "../vector";

export class Matrix4 {
  data: number[];

  private constructor() {
    this.data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  static identity = () => new Matrix4();

  static orthographic = (left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number) => {
    const m = new Matrix4();

    const lr = 1.0 / (left - right);
    const bt = 1.0 / (bottom - top);
    const nf = 1.0 / (nearClip - farClip);

    m.data[0] = -2.0 * lr;
    m.data[5] = -2.0 * bt;
    m.data[10] = -2.0 * nf;

    m.data[12] = (left + right) * lr;
    m.data[13] = (top + bottom) * bt;
    m.data[14] = (nearClip + farClip) * nf;

    return m;
  };

  static translate = (pos: Vector3) => {
    let m = new Matrix4();

    m.data[12] = pos.x;
    m.data[13] = pos.y;
    m.data[14] = pos.z;

    return m;
  };
}
