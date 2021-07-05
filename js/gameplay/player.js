import Entity from '../core/entity.js';
import game from '../core/game.js';
import Vec2 from '../utils/vec2.js';
import Bullet from './bullet.js';
import CircleCollider from '../core/collisions/circle-collider.js';

export default class Player extends Entity {
  constructor() {
    super();

    this.speed = 100;
    this.collider = new CircleCollider('player', this);
    this.collider.radius = 20;
    this.isMoving = false;
  }

  shoot() {
    const bullet = new Bullet();
    game.addEntity(bullet);
    bullet.position.copyFrom(this.position);
    const rotation = this.rotation - Math.PI * 0.5;
    const nx = Math.cos(rotation);
    const ny = Math.sin(rotation);
    const distance = 25;
    const dx = nx * distance;
    const dy = ny * distance;
    bullet.position.add(new Vec2(dx, dy));
    const speed = 20000;
    bullet.applyForce(new Vec2(nx * speed, ny * speed));
    return this;
  }

  update() {
    const dt = game.dt;

    if (game.input.isDown('KeyA') === true) {
      this.rotation -= 4 * dt;
    } else if (game.input.isDown('KeyD') === true) {
      this.rotation += 4 * dt;
    }

    if (game.input.isDown('KeyW') === true) {
      const speed = this.speed;
      const rotation = this.rotation - Math.PI * 0.5;
      const sx = Math.cos(rotation) * speed;
      const sy = Math.sin(rotation) * speed;
      this.applyForce(new Vec2(sx, sy));
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }

    super.update();

    this.collider.position.copyFrom(this.position);
  }

  render(ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(20, 20);
    ctx.lineTo(0, 10);
    ctx.lineTo(-20, 20);
    ctx.closePath();
    ctx.stroke();

    if (this.isMoving === true) {
      ctx.beginPath();
      ctx.moveTo(-10, 15);
      ctx.lineTo(0, 35);
      ctx.lineTo(10, 15);
      ctx.closePath();
      ctx.stroke();
    }
  }
}
