import CollisionTags from './collision-tags.js';

export default class CollisionDetection {
  constructor(game) {
    this.game = game;
    this._init();
  }

  update() {
    const entities = this.game.entities;
    const count = entities.length;

    for (let i = 0; i < count; ++i) {
      const entity = entities[i];
      const collider = entity.collider;

      if (collider === null) {
        continue;
      }

      for (let j = i + 1; j < count; ++j) {
        const entity2 = entities[j];

        if (entity2.collider === null) {
          continue;
        }

        this._checkCollision(collider, entity2.collider);
      }
    }
  }

  _checkCollision(a, b) {
    if (CollisionTags.check(a.tag, b.tag) === false) {
      return;
    }

    if (a.isCircle === true) {
      if (b.isCircle === true) {
        const distance = a.position.distanceTo(b.position);

        if (distance < a.radius + b.radius) {
          a.onCollided(b);
          b.onCollided(a);
        }
      } else {
        this._unknownCollider();
      }
    } else {
      this._unknownCollider();
    }
  }

  _init() {
    this._setupTags();
  }

  _setupTags() {
    CollisionTags.register('player', 'asteroid');
    CollisionTags.register('asteroid', 'player');
    CollisionTags.register('bullet', 'asteroid');
    CollisionTags.register('asteroid', 'bullet');
  }

  _unknownCollider() {
    throw 'Unknown collider';
  }
}
