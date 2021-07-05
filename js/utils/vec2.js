export default class Vec2 {
  constructor(x, y) {
    this.x = (x === undefined ? 0 : x);
    this.y = (y === undefined ? this.x : y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }

  getLength() {
    const x = this.x;
    const y = this.y;
    return Math.sqrt(x * x + y * y);
  }

  copyFrom(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  distanceTo(v) {
    const temp = v.clone();
    temp.sub(this);
    return temp.getLength();
  }

  clone() {
    return new Vec2(this.x, this.y);
  }
}
