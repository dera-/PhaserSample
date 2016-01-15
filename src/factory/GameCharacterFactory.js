'use strict';

import GameCharacterData from '../data/character.json';
import {GameRepository} from '../repository/GameRepository';
import {SpriteSheetRepository} from '../repository/SpriteSheetRepository';
import GameCharacterModel from '../model/object/GameCharacterModel';

export const GameCharacterFactory = {
  loadSpriteSheet: (key) => {
    let charaData = GameCharacterData[key];
    SpriteSheetRepository.loadSpriteSheet(charaData.image_key, charaData.image_file, charaData.width, charaData.height);
  },
  get: (key, spriteData) => {
    let game = GameRepository.get(),
      charaData = GameCharacterData[key],
      imageKey = SpriteSheetRepository.getSpriteSheetKey(charaData.image_key),
      charaSprite = game.add.sprite(spriteData.x, spriteData.y, imageKey);
    //  物理演算をオンにする
    game.physics.arcade.enable(charaSprite);
    return new GameCharacterModel(charaSprite, charaData);
  }
};