'use strict';

import Config from '../conf/config.json';

// 初期設定読み込み
export default class Boot {
  constructor(game) {}
  init() {
    // ワンタッチのみ(マルチタップはなし)
    this.input.maxPointers = 3;
    this.stage.disableVisibilityChange = true;
    if (this.game.device.desktop) {
      this.scale.pageAlignHorizontally = true;
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(Config.min_width, Config.min_height, Config.max_width, Config.max_height);
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
      this.scale.refresh();
    }
  }
  // ゲーム開始前から必要な素材の読み込み
  preload() {
    this.load.image('preloaderBar', '../../img/preloadr_bar.png');
  }
  create() {
    this.state.start('Preload');
  }
}
