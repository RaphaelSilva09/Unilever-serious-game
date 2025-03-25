export default class PlayerSelect extends Phaser.Scene {
  constructor() {
    super('playerSelect')
  }

  create() {
    const bg = this.add.image(0, 0, "blue-bg").setScale(10).setOrigin(0, 0);
    this.title = this.add.sprite(295, 110, 'title_sheet').setOrigin(0, 0).setScale(0.2);
    const f1 = this.add.image(240, 360, "frame1F");
    const f2 = this.add.image(510, 360, "frame2F");
    const m1 = this.add.image(770, 360, "frame1M");
    const m2 = this.add.image(1040, 360, "frame2M");

    this.title.play('title_anim', true)

    f1.setInteractive();
    f2.setInteractive();
    m1.setInteractive();
    m2.setInteractive();


    // Change the frame to 1 when mouse is hovers and hover_sound plays
    f1.on('pointerover', () => {

        f1.setFrame(1);
        this.sound.add('hover_sound', {loop: false, volume: 0.3}).play()
    });
    f2.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        f2.setFrame(1);
        this.sound.add('hover_sound', {loop: false, volume: 0.3}).play()
    });
    m1.on('pointerover', () => {
      // Change the frame to 1 when mouse is over
      m1.setFrame(1);
      this.sound.add('hover_sound', {loop: false, volume: 0.3}).play()
    });
    m2.on('pointerover', () => {
      // Change the frame to 1 when mouse is over
      m2.setFrame(1);
      this.sound.add('hover_sound', {loop: false, volume: 0.3}).play()
    });

    // Change to "unselected" frame
    f1.on('pointerout', () => {
      f1.setFrame(0);
    });

    f2.on('pointerout', () => {
      f2.setFrame(0);
    });

    m1.on('pointerout', () => {
      m1.setFrame(0);
    });

    m2.on('pointerout', () => {
      m2.setFrame(0);
    });

    // Call the startGame function when the button is clicked and play select
    f1.on('pointerdown', () => {
      this.sound.add('select_sound', {loop: false, volume: 0.5}).play()
      this.playerSelecionado = '1'
      this.startGame(this.playerSelecionado)
    });

    f2.on('pointerdown', () => {
      this.sound.add('select_sound', {loop: false, volume: 0.5}).play()
      this.playerSelecionado = '2'
      this.startGame(this.playerSelecionado)
    });

    m1.on('pointerdown', () => {
      this.sound.add('select_sound', {loop: false, volume: 0.5}).play()
      this.playerSelecionado = '3'
      this.startGame(this.playerSelecionado)
    });

    m2.on('pointerdown', () => {
      this.sound.add('select_sound', {loop: false, volume: 0.5}).play()
      this.playerSelecionado = '4'
      this.startGame(this.playerSelecionado)
    });
  }

  startGame(playerSelecionado) {
    console.log('Tutorial Screen');
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      if(progress === 1) this.scene.start("tutorialScreen", { playerSelecionado: playerSelecionado, titleMusicObject: this.sys.settings.data.titleMusicObject})
    })
  }
}
