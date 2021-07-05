import CircleCollider from '../core/collisions/circle-collider.js';
import Entity from '../core/entity.js';

export default class Asteroid extends Entity {
  constructor() {
    super();

    this.speed = 0;
    this._level = 0;
    this._radius = 0;
    this.collider = new CircleCollider('asteroid', this);
  }

  update() {
    super.update();
    this.collider.position.copyFrom(this.position);
  }

  getLevel() {
    return this._level;
  }

  getRadius() {
    return this._radius;
  }

  setLevel(level) {
    this._level = level;
    switch(level) {
      case 1:
        this._radius = 10;
        break;
      case 2:
        this._radius = 20;
        break;
      case 3:
        this._radius = 40;
        break;
    }
    this.collider.radius = this._radius;
    return this;
  }

  render(ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, this._radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }
}
