export default class Renderer {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this._ctx = game.canvas.getContext('2d');
  }

  render() {
    const ctx = this._ctx;
    const canvas = this.canvas;
    const entities = this.game.entities;
    const count = entities.length;
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < count; ++i) {
      const entity = entities[i];
      const position = entity.position;
      ctx.resetTransform();
      ctx.translate(position.x, position.y);
      ctx.rotate(entity.rotation);
      entity.render(ctx);
    }
  }
}
