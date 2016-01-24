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
    this.sprite.body.gravity.y = 3 * Config.game.gravity;
    //this.sprite.body.maxVelocity.y = 3 * Config.game.gravity;
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

  moveToRight() {
    this.sprite.body.velocity.x = this.speed;
    this.sprite.animations.play('right');
  }

  moveToLeft() {
    this.sprite.body.velocity.x = -1 * this.speed;
    this.sprite.animations.play('left');
  }

  stop() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

  jump() {
    if (this.sprite.body.touching.down) {
      this.sprite.body.velocity.y = -2 * Config.game.gravity;
    }
  }
}
