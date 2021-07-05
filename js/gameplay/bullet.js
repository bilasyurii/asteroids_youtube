import CircleCollider from '../core/collisions/circle-collider.js';
import Entity from '../core/entity.js';
import game from '../core/game.js';

export default class Bullet extends Entity {
  constructor() {
    super();
    
    this.life = 0;
    this.collider = new CircleCollider('bullet', this);
    this.collider.radius = 4;

    this._init();
  }

  update() {
    super.update();

    const life = this.life + game.dt;
    if (life > 2) {
      this.kill();
    } else {
      this.life = life;
    }

    this.collider.position.copyFrom(this.position);
  }

  render(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(-2, -2, 4, 4);
  }

  _init() {
    this._setupEvents();
  }

  _setupEvents() {
    this.collider.onCollision.subscribe(this._onCollided, this);
  }

  _onCollided() {
    this.kill();
  }
}
