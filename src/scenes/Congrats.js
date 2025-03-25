export default class Congrats extends Phaser.Scene {
    constructor() {
      super("congrats");
    }

    create () {
      if (this.game.language === 'Pt') {
        this.add.image(0, 0,'congrats_bg').setOrigin(0, 0);
    } else if (this.game.language === 'En') {
        this.add.image(0, 0,'congratulation').setOrigin(0, 0);
    }
  }
}
