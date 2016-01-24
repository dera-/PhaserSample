'use strict';

import GameTextModel from './GameTextModel';

const PREFIX_TEXT = 'SCORE: ';

export default class GameScoreTextModel extends GameTextModel {
  constructor(x, y) {
    super(x, y, PREFIX_TEXT + "0", {fontSize: '18px', fill: '#000'});
    this.score = 0;
  }

  updateScore (diff) {
    this.score += diff;
    this.setText(PREFIX_TEXT + this.score);
  }
}
