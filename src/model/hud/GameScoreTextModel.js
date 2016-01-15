'use strict';

import GameTextModel from './GameTextModel';

const PREFIX_TEXT = 'SCORE: ';

export default class GameScoreTextModel extends GameTextModel {
  constructor(text, data = {}) {
    super(text, data);
    this.score = 0;
  }

  // sprite等メンバ変数の初期化処理
  initialize(data) {}

  updateScore (diff) {
    this.score += diff;
    this.setText(PREFIX_TEXT + this.score);
  }
}
