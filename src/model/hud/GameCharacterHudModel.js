'use strict';

import GameCharacterModel from '../object/GameCharacterModel';
import GameScoreTextModel from './GameScoreTextModel';
import GameHpGageModel from './GameHpGageModel';

const HP_GAGEPLACE_Y = 20;
const INTERVAL = 40;

export default class GameCharacterHudModel {
  constructor(num, characterModel) {
    this.characterModel = characterModel;
    this.hpGageModel = new GameHpGageModel(
      INTERVAL * num + GameHpGageModel.getWidth() * (num - 1),
      HP_GAGEPLACE_Y,
      this.characterModel.currentHp
    );
    this.scoreTextModel = new GameScoreTextModel(
      INTERVAL * num + GameHpGageModel.getWidth() * (num - 1),
      HP_GAGEPLACE_Y + 1.05 * GameHpGageModel.getHeight()
    );
  }

  moveHpGage() {
    this.hpGageModel.setCurrentHp(this.characterModel.currentHp);
  }

  updateScore(diffValue) {
    this.scoreTextModel.updateScore(diffValue);
  }

}
