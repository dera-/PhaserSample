'use strict';

import {GameRepository} from '../repository/GameRepository';
import GameLandGroupModel from '../model/group/GameLandGroupModel';
import GameLandData from '../data/land.json';
import {ImageRepository} from '../repository/ImageRepository';

export const GameLandGroupFactory = {
  loadImages: (landsData) => {
    landsData.lands.forEach((land) => {
        let statusKey = land.data.status_key;
        ImageRepository.loadImage(GameLandData[statusKey].image_key, GameLandData[statusKey].image_file);
    });
  },
  get: (landsData) => {
    let game = GameRepository.get();
    return new GameLandGroupModel(game.add.group(), landsData.group_data, landsData.lands);
  }
};
