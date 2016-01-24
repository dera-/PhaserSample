'use strict';

import {GameRepository} from '../../repository/GameRepository';

const WIDTH = 150;
const HEIGHT = 30;
const IMAGE_WIDTH = 633
const IMAGE_HEIGHT = 125;

export default class GameHpGageModel {
  constructor(x, y, hp) {
    this.createGageSprite(x, y, 'red_gage');
    this.createGageSprite(x, y, 'green_gage');
    this.maxHp = hp;
    this.currentHp = hp;
  }

  static getWidth() {
    return WIDTH;
  }

  static getHeight() {
    return HEIGHT;
  }

  createGageSprite(x, y, key) {
    let game = GameRepository.get();
    this.greenGageSprite = game.add.sprite(x, y , key);
    this.greenGageSprite.scale.setTo(WIDTH/IMAGE_WIDTH, HEIGHT/IMAGE_HEIGHT);
    this.greenGageSprite.fixedToCamera = true;
  }

  setCurrentHp(hp) {
    this.currentHp = hp;
    this.greenGageSprite.scale.setTo(
      WIDTH / IMAGE_WIDTH * Math.round(this.currentHp / this.maxHp),
      HEIGHT / IMAGE_HEIGHT
    );
  }
}