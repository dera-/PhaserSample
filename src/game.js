'use strict';

let game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', {preload: preload, create: create, update: update});
let player,platforms,cursors,stars,scoreText,score,background;

function preload() {
  game.load.image('sky', '../img/background/Sky.png');
  game.load.image('ground', '../img/platform.png');
  game.load.image('star', '../img/star.png');
  game.load.spritesheet('rin', '../img/character/original2.png', 48, 48);
};

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  //  物理演算エンジンとして、Arcade Physicsシステムをオンにする
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.world.setBounds(0,0, 4000, 600);

  background = game.add.tileSprite(0, 0, 4000, 600, 'sky');

  //  シンプルな背景
  //game.add.sprite(0, 0, 'sky');

  //  プラットフォームグループの生成。このグループは、地面(ground)と2つの張り出し(ledge)からできている
  platforms = game.add.group();

  //  プラットフォームグループのオブジェクトは、すべて物理演算をオンにする
  platforms.enableBody = true;

  // ここで、platformsグループに地面(ground)を追加する
  let ground = platforms.create(0, game.world.height - 64, 'ground');

  //  地面のサイズをゲームの幅にフィットさせる (スプライトのオリジナルサイズは、400x32)
  ground.scale.setTo(4, 2);

  //  地面を固定する
  ground.body.immovable = true;

  //  同様に、platformsグループに張り出し(ledge)を追加する
  let ledge = platforms.create(400, 400, 'ground');

  ledge.body.immovable = true;

  ledge = platforms.create(-150, 250, 'ground');

  ledge.body.immovable = true;

  // player変数を用意して、 'dude'スプライトを設定する
  player = game.add.sprite(32, game.world.height - 150, 'rin');

  //  物理演算をオンにする
  game.physics.arcade.enable(player);

  //  Playerの物理プロパティ. このちっちゃいヤツは、すこしばかりバウンドする
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  左右に歩くためのアニメーション
  player.animations.add('left', [3,4,5], 10, true);
  player.animations.add('right', [6,7,8], 10, true);
  player.animations.add('stop', [0,1,2], 10, true);

   stars = game.add.group();

   stars.enableBody = true;

   //  12個の星を等間隔に配置する
   for (var i = 0; i < 12; i++)
   {
       // 'stars'グループの中に、星を生成する
       var star = stars.create(i * 70, 0, 'star');

       //  星に重力を設定する
       star.body.gravity.y = 200;

       //  星には、ランダムなはねかえり具合を設定する
       star.body.bounce.y = 0.7 + Math.random() * 0.2;
   }
   score = 0;
   scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};

function update() {
  //  プレイヤーとplatformグループに衝突判定を追加
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);

  game.physics.arcade.overlap(
    player,
    stars,
    (player, star)=>{
      star.kill();
     // 得点をアップして、再度表示
     score += 10;
     scoreText.text = 'Score: ' + score;
    },
    null,
    this
  );

  //  プレイヤーの移動速度をリセット
  player.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
   //  左へ移動
   player.body.velocity.x = -150;

   player.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
   //  右へ移動
   player.body.velocity.x = 150;

   player.animations.play('right');
  }
  else
  {
   //  そのまま
   // player.animations.stop();
   // player.frame = 0;

   player.animations.play('stop');
  }
  //  上矢印キーがおされて、かつプレイヤーが地面についていたらジャンプ
  if (cursors.up.isDown && player.body.touching.down)
  {
   player.body.velocity.y = -350;
  }

  // スクロール判定
  let distance = player.body.x - Math.round(game.camera.x);
  console.log("player.body.x:" + player.body.x);
  console.log("game.camera.x:" + game.camera.x);
  if (game.camera.x <= 4000 && distance > 500) {
    let diff = distance - 500;
    game.camera.x += diff;
    if (!game.camera.atLimit.x) {
      background.tilePosition.x -= diff;
    }
  } else if (game.camera.x > 0 && distance < 300) {
    let diff = distance -300;
    game.camera.x += diff;
    if (!game.camera.atLimit.x) {
      background.tilePosition.x -= diff;
    }
  }
}