'use strict';

import Config from '../conf/config.json';

// 初期設定読み込み
export default class Title {
  constructor(game) {}
  // ゲーム開始前から必要な素材の読み込み
  create() {
    this.add.sprite(0, 0, 'titlepage');
    this.add.button(Config.game.width/2-43, Config.game.height-100, 'start-button', (pointer)=>{this.state.start('GameScreen');}, this, 2, 1, 0);
  }
  update() {}
}
