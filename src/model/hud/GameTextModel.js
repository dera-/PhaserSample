'use strict';

export default class GameTextModel {
  constructor(text, data={}) {
    this.text = text;
    this.initialize(data);
  }

  // sprite等メンバ変数の初期化処理
  initialize(data) {}

  setText(str) {
    this.text.text = str;
  }

  getText() {
    return this.text;
  }
}
