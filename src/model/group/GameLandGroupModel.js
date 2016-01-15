'use strict';

import GameObjectGroupModel from './GameObjectGroupModel';
import {ImageRepository} from '../../repository/ImageRepository';
import GameLandData from '../../data/land.json';

export default class GameLandGroupModel extends GameObjectGroupModel {
  constructor(group, groupData, landsData) {
    super(group, groupData);
    for (let land of landsData) {
      let imageKey = ImageRepository.getImageKey(GameLandData[land.data.status_key].image_key);
      this.generateSprite(land.sprite.x, land.sprite.y, imageKey, land.data);
    }
  }

  initialize(groupData) {
    this.group.enableBody = groupData.enableBody;
    this.group.z = groupData.z;
  }
  // @override
  initializeSprite(sprite, data) {
    sprite.scale.setTo(data.scaleX, data.scaleY);
    sprite.body.immovable = data.immovable;
  }
}
