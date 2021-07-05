import CollisionDetection from './collisions/collision-detection.js';
import Input from './input/input.js';
import Observable from './observable.js';
import Renderer from './renderer.js';
import Screen from './screen.js';

export class Game {
  constructor() {
    this.ms = 1 / 60;
    this.dt = 1 / 60;
    this.renderer = null;
    this.canvas = null;
    this.input = null;
    this.screen = null;
    this.collisions = null;
    this.entities = [];
    this.time = 0;
    this.onUpdate = new Observable();

    this._init();
  }

  addEntity(entity) {
    this.entities.push(entity);
    return this;
  }

  start() {
    return this;
  }

  _init() {
    this._setupCanvas();
    this._initRenderer();
    this._initInput();
    this._initScreen();
    this._initCollisions();
    this._setupRAF();
  }

  _setupCanvas() {
    this.canvas = document.getElementById('gameCanvas');
  }

  _initRenderer() {
    this.renderer = new Renderer(this);
  }

  _initInput() {
    this.input = new Input(this);
  }

  _initScreen() {
    this.screen = new Screen(this);
  }

  _initCollisions() {
    this.collisions = new CollisionDetection(this);
  }

  _setupRAF() {
    window.requestAnimationFrame((time) => this._update(time));
  }

  _update(time) {
    const ms = time - this.time;
    this.time = time;
    this.ms = ms;
    this.dt = ms * 0.001;
    this.onUpdate.post();
    const entities = this.entities;

    for (let i = entities.length - 1; i >= 0; --i) {
      const entity = entities[i];
      if (entity.alive === false) {
        entities.splice(i, 1);
      }
    }

    const count = entities.length;

    for (let i = 0; i < count; ++i) {
      const entity = entities[i];
      entity.update();
    }

    this.collisions.update();
    this.renderer.render();
    this._setupRAF();
  }
}

const game = new Game();

export default game;
