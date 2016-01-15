'use strict';

import Config from '../conf/config.json';
import {GameRepository} from '../repository/GameRepository';
import Event from '../data/event.json';
import Stage from '../data/stage.json';

let currentStage = "1";

export const StageRepository = {
  getStageData: () => {
    if (currentStage in Event.stages) {
      return Stage[Event.stages[currentStage].key];
    }
    throw new Error('存在しないステージです');
  },
  nextStage: () => {
    currentStage = Event.stages[currentStage].next_id;
  }
};