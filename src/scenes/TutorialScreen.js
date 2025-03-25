export default class TutorialScreen extends Phaser.Scene {
  constructor() {
    super("tutorialScreen");
  }

  preload() {
    // Sound effects and music
    this.load.audio("grass_sound", "assets/sounds/level2/lvl_2_grass_walk.ogg");
    this.load.audio("floor_sound", "assets/sounds/level1/lvl_1_floor_walk.ogg");
    this.load.audio("jump_sound", "assets/sounds/jump_sound.mp3");
    this.load.audio("music_level1", "assets/sounds/level1/music_level_1.mp3");
    this.load.audio("open_level1", "assets/sounds/level1/open_level_1.ogg");
    this.load.audio("dialog_sound", "assets/sounds/dialog_sound.ogg");
    this.load.audio("player_hurt", "assets/sounds/player_hurt.wav");
    this.load.audio("slime_hurt", "assets/sounds/level2/slimeHit.wav");
    this.load.audio("slime_die", "assets/sounds/level2/slime_die.wav");
    this.load.audio("smoke_hurt", "assets/sounds/level3/smoke_hurt.wav");
    this.load.audio("smoke_die", "assets/sounds/level3/smoke_die.wav");
    this.load.audio("shoot_effect", "assets/sounds/shootEffect.wav");
    this.load.audio("select_sound", "assets/sounds/select_sound.wav");
    this.load.audio("music_level2", "assets/sounds/level2/lvl_2_theme.mp3");
    this.load.audio("door_sound", "assets/sounds/level1/door_sound.mp3");
    this.load.audio("collect_powerup_sound", "assets/sounds/collect_powerup_sound.mp3");
    this.load.audio("dash_sound", "assets/sounds/dash_sound.wav");
    this.load.audio("boss_hit_sound_level2", 'assets/sounds/level2/hitBossLevel2.wav');
    this.load.audio("boss2_die", 'assets/sounds/level2/boss2_die.mp3');
    this.load.audio("boss_hit_sound_level3", 'assets/sounds/level3/hitBossLevel3.wav');
    this.load.audio("boss3_die", 'assets/sounds/level3/boss3_die.wav');
    this.load.audio("cityTraffic", 'assets/sounds/level3/cityTraffic.wav');
    this.load.audio("music_level3", 'assets/sounds/level3/cityBattle.mp3');
    this.load.audio("checkpoint_sound", "assets/sounds/checkpoint_sound.wav");
    this.load.audio("music_level4", 'assets/sounds/level4/music_level4.mp3');
    // Tutorial
    this.load.video('tutorialPt', 'assets/links/videoTutorial1.mp4');
    this.load.video('tutorialEn', 'assets/links/videoTutorial1En.mp4');
    this.load.video('rexonaTutorial', 'assets/links/videoTutorialQ.mp4')
    this.load.video('kibonTutorial', 'assets/links/videoTutorialW.mp4')
  }

  create() {
    this.video = this.add.video(0, 0, `tutorial${this.game.language}`).setOrigin(0, 0); // Create and position video
    this.video.play() // Play video

    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Interact key

    this.playerSelecionado = this.sys.settings.data.playerSelecionado; // Pass selected player to level1
  }

  update() {
    // Start Game
    if(Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      this.video.stop() // Stop video
      this.sound.add('select_sound', {loop: false, volume: 0.7}).play() // Select Sound
      this.startGame() // Start game
    }
  }

  startGame() {
    // Fade effect to transition and pass the scene when the effect is done with personagemSelecionado
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      console.log('StartLevel1');
      this.sys.settings.data.titleMusicObject.stop();
      if(progress === 1) this.scene.start("level1", { playerSelecionado: this.playerSelecionado})
    })
  }
}
