'use strict';

import Config from '../conf/config.json';
import Boot from '../state/Boot.js';
import Preload from '../state/Preload.js';
import Title from '../state/Title.js';
import GameScreen from '../state/GameScreen.js';

export const GameRepository = {
  gameObject : null,
  get : () => {
    if (GameRepository.gameObject === null) {
      GameRepository.initialize();
    }
    return GameRepository.gameObject;
  },
  initialize : () => {
    let game = new Phaser.Game(Config.game.width, Config.game.height, Phaser.AUTO, 'gameContainer');

    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('Title', Title);
    game.state.add('GameScreen', GameScreen);

    GameRepository.gameObject = game;
  },
  changeScene: (key) => {
    if (GameRepository.gameObject.state.checkState(key)) {
      GameRepository.gameObject.state.start(key);
    } else {
      throw new Error('そんなSceneはない');
    }
  }
};