import Vec2 from '../utils/vec2.js';
import game from './game.js';
import Observable from './observable.js';

export default class Entity {
  constructor() {
    this.position = new Vec2();
    this.velocity = new Vec2();
    this.force = new Vec2();
    this.drag = 0;
    this.rotation = 0;
    this.alive = true;
    this.onDead = new Observable();
    this.collider = null;
  }

  kill() {
    this.alive = false;
    this.onDead.post(this);
    return this;
  }

  applyForce(force) {
    this.force.add(force);
    return this;
  }

  update() {
    const dt = game.dt;
    const velocity = this.velocity;
    const force = this.force;

    velocity.add(force.scale(dt));
    force.set(0, 0);
    this.position.add(velocity.clone().scale(dt));

    const len = velocity.getLength();
    const drag = this.drag;

    if (drag !== 0 && len !== 0) {
      const speed = len - drag * dt;
      if (speed <= 0) {
        velocity.set(0, 0);
      } else {
        const nx = velocity.x / len;
        const ny = velocity.y / len;
        velocity.set(nx * speed, ny * speed);
      }
    }
  }

  render(ctx) {
  }
}
