import Smoke from "./Smoke.js";

// extends smoke properties (used only to specify class, so tile can read and spawn enemy correctly)
export default class graySmoke extends Smoke {
  constructor(scene, x, y, smoke_name) {
    super(scene, x, y, smoke_name);
    this.damage = 25
    this.health = 2

    this.init_graySmoke()
  }

  init_graySmoke(){
    this.setScale(1.1).refreshBody().setSize(60, 80).setOffset(30, 30);
  }
}