import game from '../core/game.js';
import Vec2 from '../utils/vec2.js';
import Asteroid from './asteroid.js';
import Player from './player.js';

export default class Gameplay {
  constructor() {
    this.player = null;
    this.score = 0;
    this.lives = 3;

    this._init();
  }

  update() {
    const entities = game.entities;
    const count = entities.length;
    const screen = game.screen;
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    for (let i = 0; i < count; ++i) {
      const entity = entities[i];
      const position = entity.position;

      if (position.x > screenWidth) {
        position.x -= screenWidth;
      } else if (position.x < 0) {
        position.x += screenWidth;
      }

      if (position.y > screenHeight) {
        position.y -= screenHeight;
      } else if (position.y < 0) {
        position.y += screenHeight;
      }
    }
  }

  _init() {
    this._initPlayer();
    this._setupEvents();
    this._spawnAsteroids();
  }

  _initPlayer() {
    const player = new Player();
    this.player = player;
    game.addEntity(player);
    player.position.set(game.screen.width * 0.5, game.screen.height * 0.5);
  }

  _setupEvents() {
    game.onUpdate.subscribe(() => this.update());
    game.input.onDown.subscribe(this._onDown, this);
    this.player.collider.onCollision.subscribe(this._onPlayerCollided, this);
  }

  _spawnAsteroids() {
    const count = 5;
    const screen = game.screen;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const random = Math.random;
    const pi2 = Math.PI * 2;

    for (let i = 0; i < count; ++i) {
      const asteroid = new Asteroid();
      asteroid.setLevel(3);
      game.addEntity(asteroid);
      asteroid.position.set(random() * screenWidth, random() * screenHeight);
      const angle = random() * pi2;
      const speed = random() * 50 + 50;
      asteroid.speed = speed;
      const force = new Vec2(Math.cos(angle) * speed, Math.sin(angle) * speed);
      asteroid.applyForce(force);
      asteroid.collider.onCollision.subscribe(this._onAsteroidCollided, this);
    }
  }

  _onDown(key) {
    if (key === 'Space') {
      this.player.shoot();
    }
  }

  _onPlayerCollided() {
    this.player.kill();
    const lives = this.lives - 1;
    this.lives = lives;

    if (lives === 0) {
      console.error('YOU DIED');
    } else {
      setTimeout(() => this._respawn(), 1000);
    }
  }

  _onAsteroidCollided(_, deadAsteroid) {
    deadAsteroid.kill();
    this._onScore(10);

    const newLevel = deadAsteroid.getLevel() - 1;

    if (newLevel === 0) {
      return;
    }

    const count = 3;
    const random = Math.random;
    const pi2 = Math.PI * 2;
    const position = deadAsteroid.position;
    const radius = deadAsteroid.getRadius();

    for (let i = 0; i < count; ++i) {
      const asteroid = new Asteroid();
      asteroid.setLevel(newLevel);
      game.addEntity(asteroid);
      asteroid.position.copyFrom(position);
      const angle = random() * pi2;
      const speed = deadAsteroid.speed + 1000;
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      const force = new Vec2(nx * speed, ny * speed);
      const distance = radius - asteroid.getRadius();
      const offset = new Vec2(nx * distance, ny * distance)
      asteroid.position.add(offset);
      asteroid.applyForce(force);
      asteroid.collider.onCollision.subscribe(this._onAsteroidCollided, this);
    }
  }

  _onScore(amount) {
    const newScore = this.score + amount;
    this.score = newScore;
    console.warn(newScore);
  }

  _respawn() {
    const player = this.player;
    player.alive = true;
    game.addEntity(this.player);
    player.position.set(game.screen.width * 0.5, game.screen.height * 0.5);
    player.collider.position.copyFrom(player.position);
    player.velocity.set(0, 0);
    player.force.set(0, 0);
  }
}
