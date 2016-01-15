'use strict';

import Config from '../conf/config.json';
import {GameRepository} from '../repository/GameRepository';

export const ImageRepository = {
  registeredImages: new Map(),
  loadImage: (key, file) => {
    let game = GameRepository.get();
    if (!ImageRepository.registeredImages.has(key)) {
      game.load.image(key, '../../img/' + file);
      ImageRepository.registeredImages.set(key, file);
      return true;
    }
    return false;
  },
  getImageKey: (key) => {
    if (ImageRepository.registeredImages.has(key)) {
      return key;
    }
    throw new Error(key + ": そんなkeyは存在しない");
  },
  deleteImageKey: (key) => {
    ImageRepository.registeredImages.delete(key);
    GameRepository.get().removeFile('image', key);
  }
};