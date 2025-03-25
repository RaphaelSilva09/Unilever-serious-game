import Slime from "./Slime.js";

// extends slime properties (used only to specify class, so tile can read and spawn enemy correctly)
export default class GreenSlime extends Slime {
  constructor(scene, x, y, slime_name) {
    super(scene, x, y, slime_name);
    this.damage = 20
    this.health = 2
  }
}
