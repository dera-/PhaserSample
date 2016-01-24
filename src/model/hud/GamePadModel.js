'use strict';

import {GameRepository} from '../../repository/GameRepository';

const BUTTON_PLACE_Y = 540;
const LEFT_BUTTON_PLACE_X = 50;
const RIGHT_BUTTON_PLACE_X = 130;
const JUMP_BUTTON_PLACE_X = 400;
const BUTTON_REAL_WIDTH = 270;
const BUTTON_REAL_HEIGHT = 255;
const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 50;

export default class GamePadModel {
  constructor(playerCharacter) {
    this.isDoingAction = false;
    this.playerCharacter = playerCharacter;
    this.leftButton = this.generateButtonSprite(LEFT_BUTTON_PLACE_X, BUTTON_PLACE_Y, 'left_button');
    this.rightButton = this.generateButtonSprite(RIGHT_BUTTON_PLACE_X, BUTTON_PLACE_Y, 'right_button');
    this.jumpButton = this.generateButtonSprite(JUMP_BUTTON_PLACE_X, BUTTON_PLACE_Y, 'jump_button');
    //イベント登録
    this.leftButton.events.onInputDown.add(()=>{
      this.playerCharacter.moveToLeft();
      this.isDoingAction = true;
    });
    this.rightButton.events.onInputDown.add(()=>{
      this.playerCharacter.moveToRight();
      this.isDoingAction = true;
    });
    this.jumpButton.events.onInputDown.add(()=>{
      this.playerCharacter.jump();
      this.isDoingAction = true;
    });
    this.leftButton.events.onInputUp.add(()=>{
      if (!this.isDoingAction) {
        this.playerCharacter.stop();
      }
    });
    this.rightButton.events.onInputUp.add(()=>{
      if (!this.isDoingAction) {
        this.playerCharacter.stop();
      }
    });
  }

  update() {
    this.isDoingAction = false;
  }

  generateButtonSprite(x, y, key) {
    let sprite = GameRepository.get().add.sprite(x, y, key);
    sprite.scale.setTo(BUTTON_WIDTH / BUTTON_REAL_WIDTH, BUTTON_HEIGHT / BUTTON_REAL_HEIGHT);
    sprite.fixedToCamera = true;
    sprite.inputEnabled = true;
    return sprite;
  }
}
