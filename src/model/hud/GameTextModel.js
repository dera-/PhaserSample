'use strict';

import {GameRepository} from '../../repository/GameRepository';

export default class GameTextModel {
  constructor(x, y, sentence, data = {}, fixedToCamera = true) {
    let game = GameRepository.get();
    this.text = game.add.text(x, y, sentence, data);
    this.text.fixedToCamera = fixedToCamera;
  }

  setText(str) {
    this.text.text = str;
  }

  getText() {
    return this.text;
  }
}
