export default class Screen {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.width = 0;
    this.height = 0;

    this._init();
  }

  resize() {
    const canvas = this.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  _init() {
    this._setupEvents();
    this.resize();
  }

  _setupEvents() {
    window.onresize = () => this.resize();
  }
}
