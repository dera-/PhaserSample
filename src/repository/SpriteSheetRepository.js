'use strict';

import Config from '../conf/config.json';
import {GameRepository} from '../repository/GameRepository';

export const SpriteSheetRepository = {
  registeredSpriteSheets: new Map(),
  loadSpriteSheet: (key, file, width, height) => {
    let game = GameRepository.get();
    if (!SpriteSheetRepository.registeredSpriteSheets.has(key)) {
      game.load.spritesheet(key, '../../img/' + file, width, height);
      SpriteSheetRepository.registeredSpriteSheets.set(key, file);
      return true;
    }
    return false;
  },
  getSpriteSheetKey: (key) => {
    if (SpriteSheetRepository.registeredSpriteSheets.has(key)) {
      return key;
    }
    throw new Error(key+": そんなkeyは存在しない");
  },
  deleteSpriteSheetKey: (type, key) => {
    SpriteSheetRepository.registeredSpriteSheets.delete(key);
    GameRepository.get().removeFile(type, key);
  }
};