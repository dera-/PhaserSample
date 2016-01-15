'use strict';

import {GameRepository} from '../repository/GameRepository';
import GameItemGroupModel from '../model/group/GameItemGroupModel';
import GameItemData from '../data/item.json';
import {ImageRepository} from '../repository/ImageRepository';

export const GameItemGroupFactory = {
  loadImages: (itemsData) => {
    itemsData.items.forEach((item) => {
        let statusKey = item.data.status_key;
        ImageRepository.loadImage(GameItemData[statusKey].image_key, GameItemData[statusKey].image_file);
    });
  },
  get: (itemsData) => {
    let game = GameRepository.get();
    return new GameItemGroupModel(game.add.group(), itemsData.group_data, itemsData.items);
  }
};