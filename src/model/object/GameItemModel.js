'use strict';

import Config from '../../conf/config.json';
import GameObjectModel from './GameObjectModel';

export default class GameItemModel extends GameObjectModel {
  // sprite等メンバ変数の初期化処理
  initialize(data) {
    this.sprite.gravity.y = data.gravity.y;
    this.sprite.bounce.y = data.bounce.y;
  }
}
