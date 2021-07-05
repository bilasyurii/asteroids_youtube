import Observable from '../observable.js';

export default class Input {
  constructor(game) {
    this.game = game;
    this.onDown = new Observable();
    this.onUp = new Observable();
    this._states = {};

    this._init();
  }

  isDown(key) {
    return this._states[key] || false;
  }

  isUp(key) {
    const state = this._states[key];
    return (state === undefined ? true : state);
  }

  _init() {
    this._setupEvents();
  }

  _setupEvents() {
    document.addEventListener('keydown', (event) => this._onDown(event));
    document.addEventListener('keyup', (event) => this._onUp(event));
  }

  _onDown(event) {
    const code = event.code;
    this._states[code] = true;
    this.onDown.post(code);
  }

  _onUp(event) {
    const code = event.code;
    this._states[code] = false;
    this.onUp.post(code);
  }
}
