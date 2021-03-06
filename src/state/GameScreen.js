'use strict';

import Config from '../conf/config.json';
import GameCharacterHudModel from '../model/hud/GameCharacterHudModel';
import GamePadModel from '../model/hud/GamePadModel';
import {StageRepository} from '../repository/StageRepository';
import {GameCharacterFactory} from '../factory/GameCharacterFactory';
import {GameLandGroupFactory} from '../factory/GameLandGroupFactory';
import {GameItemGroupFactory} from '../factory/GameItemGroupFactory';
import {ImageRepository} from '../repository/ImageRepository';

// 初期設定読み込み
export default class GameScreen {
  constructor(game) {
    this.camera = null;
    this.playerModel = null;
    this.stageModel = null;
    this.backgroundSprite = null;
    this.itemGroupModel = null;
    this.playerHudModel = null;
    this.gamepad = null;
  }
  preload() {
    let stageData = StageRepository.getStageData();
    ImageRepository.loadImage(stageData.background.image_key, stageData.background.image_file);
    GameCharacterFactory.loadSpriteSheet(stageData.player.data.status_key);
    GameLandGroupFactory.loadImages(stageData.land_group);
    GameItemGroupFactory.loadImages(stageData.item_group);
  }
  // ゲーム開始前から必要な素材の読み込み
  create() {
    let stageData = StageRepository.getStageData(),
      backgroundImageKey = ImageRepository.getImageKey(stageData.background.image_key, stageData.background.image_file);
    //  物理演算エンジンとして、Arcade Physicsシステムをオンにする
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = Config.game.gravity;
    this.world.setBounds(0,0, stageData.width, stageData.height);
    this.backgroundSprite = this.add.tileSprite(0, 0, stageData.width, stageData.height, backgroundImageKey);
    this.playerModel = GameCharacterFactory.get(stageData.player.data.status_key, stageData.player.sprite);
    this.stageModel = GameLandGroupFactory.get(stageData.land_group);
    this.itemGroupModel = GameItemGroupFactory.get(stageData.item_group);
    this.playerHudModel = new GameCharacterHudModel(1, this.playerModel);
    this.gamepad = new GamePadModel(this.playerModel);
    this.camera.follow(this.playerModel.getSprite());
  }

  update() {
    let player = this.playerModel.getSprite(),
      items = this.itemGroupModel.getGroup(),
      stage = this.stageModel.getGroup();
    //  プレイヤーとplatformグループに衝突判定を追加
    this.physics.arcade.collide(player, stage);
    this.physics.arcade.collide(items, stage);

    this.physics.arcade.overlap(
      player,
      items,
      (player, item) => {
        item.kill();
        this.playerHudModel.updateScore(10);
      },
      null,
      this
    );
    this.gamepad.update();
  }
}
