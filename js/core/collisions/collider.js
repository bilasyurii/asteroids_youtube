import Observable from '../../core/observable.js';

export default class Collider {
  constructor(tag, owner) {
    this.tag = tag;
    this.owner = owner;
    this.onCollision = new Observable();
  }

  onCollided(collider) {
    this.onCollision.post(collider.owner, this.owner);
  }
}
