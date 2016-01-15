'use strict';

import GameObjectModel from './GameObjectModel';

export default class GameLandModel extends GameObjectModel {
  // sprite等メンバ変数の初期化処理
  initialize(data) {
    this.sprite.scale.setTo(data.scaleX, data.scaleY);
    this.sprite.body.immovable = data.immovable;
  }
}
