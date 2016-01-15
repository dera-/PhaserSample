'use strict';

export default class GameObjectModel {
  constructor(sprite, data) {
    this.sprite = sprite;
    this.initialize(data);
  }

  // sprite等メンバ変数の初期化処理
  initialize(data) {}

  getSprite() {
    return this.sprite;
  }
}
