export default class CollisionTags {
  constructor() {
    throw 'Static class';
  }

  static register(a, b) {
    const matrix = CollisionTags._matrix;
    let hash = matrix[a]
    if (hash === undefined) {
      hash = matrix[a] = {};
    }
    hash[b] = true;
  }

  static check(a, b) {
    return CollisionTags._matrix[a][b] === true;
  }
}

CollisionTags._matrix = {};
