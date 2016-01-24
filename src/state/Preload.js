'use strict';

import Config from '../conf/config.json';
import {ImageRepository} from '../repository/ImageRepository';
import {SpriteSheetRepository} from '../repository/SpriteSheetRepository';

// 初期設定読み込み
export default class Preload {
  constructor(game) {
    this.preloadBar = null;
  }
  // ゲーム開始前から必要な素材の読み込み
  preload() {
    this.stage.backgroundColor = 'navy';
    this.preloadBar = this.add.sprite((Config.game.width-311)/2, (Config.game.height-27)/2, 'preloaderBar');
    ImageRepository.loadImage('red_gage', 'hud/hp_bar_base.png');
    ImageRepository.loadImage('green_gage', 'hud/hp_bar.png');
    ImageRepository.loadImage('right_button', 'hud/right.png');
    ImageRepository.loadImage('left_button', 'hud/left.png');
    ImageRepository.loadImage('jump_button', 'hud/jump.png');
    ImageRepository.loadImage('titlepage', 'background/Crystal.png');
    SpriteSheetRepository.loadSpriteSheet('start-button', 'button.png', 87, 48);
  }
  create() {
    this.preloadBar.cropEnabled = false;
    this.state.start('Title');
  }
}
