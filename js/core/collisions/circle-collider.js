import Collider from './collider.js';
import Vec2 from '../../utils/vec2.js';

export default class CircleCollider extends Collider {
  constructor(tag, owner) {
    super(tag, owner);

    this.position = new Vec2();
    this.radius = 0;
    this.isCircle = true;
  }
}
