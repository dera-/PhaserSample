'use strict';

export default class GameObjectGroupModel {
  constructor(group, groupData) {
    this.group = group;
    this.initialize(groupData);
  }

  initialize(groupData) {}

  getGroup() {
    return this.group;
  }

  generateSprite(x, y, key, data) {
    let sprite = this.group.create(x, y, key);
    this.initializeSprite(sprite, data);
  }

  initializeSprite(sprite, data) {}
}
