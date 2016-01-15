'use strict';

import GameObjectGroupModel from './GameObjectGroupModel';
import {ImageRepository} from '../../repository/ImageRepository';
import GameItemData from '../../data/item.json';

export default class GameItemGroupModel extends GameObjectGroupModel {
  constructor(group, groupData, itemsData) {
    super(group, groupData);
    for (let item of itemsData) {
      let imageKey = ImageRepository.getImageKey(GameItemData[item.data.status_key].image_key);
      this.generateSprite(item.sprite.x, item.sprite.y, imageKey, item.data);
    }
  }

  initialize(groupData) {
    this.group.enableBody = groupData.enableBody;
  }

  // @override
  initializeSprite(sprite, data) {
    sprite.body.gravity.y = data.gravity.y;
    sprite.body.bounce.y = data.bounce.y;
  }
}
