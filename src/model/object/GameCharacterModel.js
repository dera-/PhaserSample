'use strict';

import Config from '../../conf/config.json';
import GameObjectModel from './GameObjectModel';

export default class GameCharacterModel extends GameObjectModel {
  // @override
  initialize(data) {
    this.maxHp = data.status.hp;
    this.currentHp = data.status.hp;
    this.attack = data.status.attack;
    this.defence = data.status.defense;
    this.speed = data.status.speed;
    // スプライトの初期設定
    this.sprite.body.bounce.y = Config.game.bounce_rate;
    this.sprite.body.gravity.y = Config.game.gravity;
    this.sprite.body.collideWorldBounds = true;
    //  左右に歩くためのアニメーション
    this.sprite.animations.add('left', [3,4,5], 10, true);
    this.sprite.animations.add('right', [6,7,8], 10, true);
    this.sprite.animations.add('stop', [0,1,2], 10, true);
  }

  isAlive() {
    return this.currentHp > 0;
  }

  damage(value) {
    this.currentHp -= value;
  }
}
