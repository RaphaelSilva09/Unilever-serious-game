export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
    this.languageText = null;
  }

  preload() {
    this.load.video('background_clouds', 'assets/titleScreen/backgroundLoop.mp4')
    this.load.audio("select_sound", "assets/sounds/select_sound.wav");
    this.load.audio("title_music", "assets/sounds/title_music.ogg");
    this.load.audio("hover_sound", "assets/sounds/hover_sound.wav");
    this.load.image('sky', 'assets/titleScreen/sky.png');
    this.load.image('hills', 'assets/titleScreen/hills.png');
    this.load.image('clouds', 'assets/titleScreen/clouds.png');
    this.load.image('foreground', 'assets/titleScreen/foreground.png');
    this.load.image('cloudCover', 'assets/titleScreen/cloudCover.png');
    this.load.spritesheet("play", "assets/titleScreen/play_x4.png", { frameWidth: 192, frameHeight: 52 });
    this.load.spritesheet("music", "assets/titleScreen/music_x4.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("botao_jogar", "assets/titleScreen/botao_jogar.png", { frameWidth: 192, frameHeight: 52 });
    this.load.spritesheet("language", "assets/titleScreen/language.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("creditos", "assets/titleScreen/creditos_x4.png", { frameWidth: 192, frameHeight: 52 });
    this.load.spritesheet("credits", "assets/titleScreen/credits_x4.png", { frameWidth: 192, frameHeight: 52 });
    this.load.spritesheet("title_sheet", "assets/titleScreen/title_sheet.png", { frameWidth: 3533, frameHeight: 497});
  }

  create() {
    this.add.video(0, -100, "background_clouds").setOrigin(0,0).setScale(1.12).play(true).setPlaybackRate(0.7);
    this.hills = this.add.image(0, -100, "hills").setOrigin(0, 0).setScale(1.12);
    this.foreground = this.add.image(0, -100, "foreground").setOrigin(0, 0).setScale(1.12);

    const musicButton = this.add.sprite(686, 460, 'music', 0).setOrigin(0, 0).setScale(1.2);
    const languageButton = this.add.sprite(533, 460, 'language', 0).setOrigin(0, 0).setScale(1.2).setInteractive();
    this.playButton = this.add.sprite(533, 320, 'botao_jogar', 0).setOrigin(0, 0).setScale(1.2);
    this.creditsButton = this.add.sprite(533, 390, 'creditos', 0).setOrigin(0, 0).setScale(1.2).setInteractive();
    
    
    // adding the title sprite
    this.titleSprite = this.add.sprite(295, 150, 'title_sheet').setOrigin(0, 0).setScale(0.2);
    this.anims.create({ 
      key: 'title_anim', 
      frames: this.anims.generateFrameNumbers('title_sheet', { start: 0, end: 3}),
      frameRate: 5, 
      repeat: -1 
    });
    
    this.titleSprite.anims.play('title_anim', true);


    // Handles music
    this.titleMusic = this.sound.add('title_music', {loop: true, volume: 0.7})
    if(this.sys.settings.data.titleMusicObject) {
      this.titleMusic = this.sys.settings.data.titleMusicObject
      this.titleMusic.resume()
    }
    else {
      this.titleMusic.play()
    }

    // Initialize current language. Let's start with Portuguese ('Pt')
    this.game.language = this.sys.settings.data.language || 'Pt'
    this.language = this.game.language

    switch (this.language) {
      case 'Pt':
        this.creditsButton.setTexture('creditos');
        this.playButton.setTexture('botao_jogar');
        break;
      case 'En':
        this.playButton.setTexture('play');
        this.creditsButton.setTexture('credits');
        break;
      default:
        console.log('no language selected');
        break;
    }

    const updateButtonFrame = () => {
      // Update button frame based on current language
      const frame = this.game.language === 'Pt' ? 0 : 2
      languageButton.setFrame(frame)
    }

    languageButton.on('pointerover', () => {
      // Change the frame to hover state based on current language
      const hoverFrame = this.game.language === 'Pt' ? 1 : 3
      languageButton.setFrame(hoverFrame)
    })

    languageButton.on('pointerout', updateButtonFrame)

    languageButton.on('pointerdown', () => {
      // Play sound effect
      this.sound.add('select_sound', { loop: false, volume: 0.7 }).play()

      // Toggle language
      if (this.game.language === 'Pt') {
        this.game.language = 'En'
        this.playButton = this.add.sprite(533, 320, 'play', 0).setOrigin(0, 0).setScale(1.2);
        this.creditsButton = this.add.sprite(533, 390, 'credits', 0).setOrigin(0, 0).setScale(1.2);
      } else {
        this.game.language = 'Pt'
        this.playButton = this.add.sprite(533, 320, 'botao_jogar', 0).setOrigin(0, 0).setScale(1.2);
        this.creditsButton = this.add.sprite(533, 390, 'creditos', 0).setOrigin(0, 0).setScale(1.2);
      }

      //Add text when changes the language
      updateLanguageText();

      // Update the button's frame to reflect the new language's normal state
      updateButtonFrame()
      console.log("Selected language: "+this.game.language);
    })

    this.creditsButton.on('pointerdown', () => {
      // Play sound effect
      this.sound.add('select_sound', { loop: false, volume: 0.7 }).play()
      this.titleMusic.pause()
      this.scene.start("creditScreen", { titleMusicObject: this.titleMusic, language: this.game.language });
    });


    const updateLanguageText = () => {
      // destroy the text if already exists
      if (this.languageText) {
        this.languageText.destroy();
      }

      // config where the thext will spawn
      const text = this.game.language === 'Pt' ? 'Idioma: Português' : 'Language: English'
      const textStyle = {
        font: 'bold 30px "Arial Black"',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6
      }
        // Coordinates for centering the text
      const centerX = this.sys.game.config.width / 2

        // Adding the text
      this.languageText = this.add.text(centerX + 12,  570, text, textStyle)
      this.languageText.setOrigin(0.5, 0.5)

        // set time for disappear
      setTimeout(() => {
        this.languageText.setVisible(false);
      }, 2000);
    }

    // initialize the text on title
    updateLanguageText();

    // Initialize button frame based on the current language
    updateButtonFrame()

    this.creditsButton.setInteractive();
    this.creditsButton.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        this.creditsButton.setFrame(1);
    });

    this.creditsButton.on('pointerout', () => {
        // Change the frame back to 0 when mouse is out
        this.creditsButton.setFrame(0);
    });

    this.playButton.setInteractive();
    this.playButton.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        this.playButton.setFrame(1);
    });

    this.playButton.on('pointerout', () => {
        // Change the frame back to 0 when mouse is out
        this.playButton.setFrame(0);
    });

    this.playButton.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.sound.add('select_sound', {loop: false, volume: 0.7}).play()
      this.preloadGame();
    });

    musicButton.setInteractive();
    musicButton.on('pointerdown', () => {
      // Change frame and mute based on game sound mute
      this.game.sound.mute ? musicButton.setFrame(0) : musicButton.setFrame(1)
      this.game.sound.setMute(!this.game.sound.mute)
    });
  }

  preloadGame() {
    this.cameras.main.fadeOut(400, 0, 0, 0, (camera, progress) => {
      if(progress === 1) this.scene.start("preload", {titleMusicObject: this.titleMusic})
    })
  }
}
