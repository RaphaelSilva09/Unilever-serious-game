export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level2/back.png");
    // ------------------------------------------------------------------
    // playerSelect
    this.load.spritesheet("frame1F", "assets/selection/selection1F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame1M", "assets/selection/selection1M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2F", "assets/selection/selection2F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2M", "assets/selection/selection2M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.image("blue-bg", "assets/selection/bg-lightblue.png")
    // ------------------------------------------------------------------
    // level1
    this.load.tilemapTiledJSON('level1', 'assets/level1/sceneInterior.json');
    this.load.image('level1_t1', 'assets/level1/level1_t1.png');
    this.load.image('level1_t2', 'assets/level1/level1_t2.png');
    this.load.image('level1_t3', 'assets/level1/level1_t3.png');
    // ------------------------------------------------------------------
    // Level2
    this.load.tilemapTiledJSON('level2', 'assets/level2/mundo_ludico.json');
    this.load.image('level2_t1', 'assets/level2/level2_t1.png');
    this.load.image('level2_t2', 'assets/level2/level2_t2.png');
    this.load.image('bg_cloud', 'assets/level2/background/bg-cloud.png');
    this.load.image('bg_color_blue', 'assets/level2/background/bg-color-blue.png');
    this.load.image('bg_color_green', 'assets/level2/background/bg-color-green.png');
    this.load.image('bg_foreground', 'assets/level2/background/foreground.png');
    this.load.image('bg_hills', 'assets/level2/background/hills.png');
    this.load.image('placa_unilever', 'assets/level2/placa_unilever.png');
    this.load.spritesheet('aviao_unilever', 'assets/level2/aviao_unilever.png', { frameWidth: 256, frameHeight: 144 });
    this.load.spritesheet('balao_unilever', 'assets/level2/balao_unilever.png', { frameWidth: 192, frameHeight: 256 });
    // ------------------------------------------------------------------
    // Level3
    this.load.tilemapTiledJSON('level3', 'assets/level3/mundo_cidade.json');
    this.load.image('buildings', 'assets/level3/buildings_t1.png')
    this.load.image('road', 'assets/level3/road.png')
    this.load.image('predios_env', 'assets/level3/predios.png')
    this.load.image('ceu_bg', 'assets/level3/ceu.png')
    this.load.image('nuvem_bg', 'assets/level3/nuvem.png')
    this.load.image('predios_bg', 'assets/level3/predios_bg.png')
    // ------------------------------------------------------------------
    // Level4
    this.load.tilemapTiledJSON('level4', 'assets/level4/assets/uni_level.json');
    this.load.image('level4_t1', 'assets/level4/assets/level4_t1.png');
    this.load.image('bg_azul', 'assets/level4/assets/bg_azul.png');
    this.load.image('bg_color', 'assets/level4/assets/bg_color.png');
    this.load.image('bg_cinza', 'assets/level4/assets/bg_cinza.png');
    this.load.image('cif_logo', 'assets/level4/assets/cif_logo.png');
    this.load.image('clear_logo', 'assets/level4/assets/clear_logo.png');
    this.load.image('comfort_logo', 'assets/level4/assets/comfort_logo.png');
    this.load.image('fofo_logo', 'assets/level4/assets/fofo_logo.png');
    this.load.image('hellmans_logo', 'assets/level4/assets/hellmans_logo.png');
    this.load.image('lux_logo', 'assets/level4/assets/lux_logo.png');
    this.load.image('maizena_logo', 'assets/level4/assets/maizena_logo.png');
    this.load.image('TRES_logo', 'assets/level4/assets/TRES_logo.png');
    this.load.image('uni_logo', 'assets/level4/assets/uni_logo.png');

    // ------------------------------------------------------------------
     // Congrats
    this.load.image('congrats_bg', 'assets/congratulation/congratulation.png');
    this.load.image('congratulation', 'assets/congratulation/congratulations_export.png');
     // ------------------------------------------------------------------
    // Hub
    this.load.spritesheet('hub_sprite', 'assets/level2/dvd_npc.png', { frameWidth: 256, frameHeight: 160 });
    this.load.image('hub_screen', 'assets/links/links_screen.png');
    this.load.image('hub_close', 'assets/links/x_button.png');
    this.load.spritesheet('hub_link_button', 'assets/links/link_button.png', { frameWidth: 128, frameHeight: 128 })
    this.load.spritesheet('checkpoint_word', 'assets/links/checkpoint.png', { frameWidth: 500, frameHeight: 120 })
    this.load.spritesheet('checkpoint_blue_point', 'assets/links/blue_point.png', { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('checkpoint_red_point', 'assets/links/red_point.png',{ frameWidth: 48, frameHeight: 32 });
  // ------------------------------------------------------------------
    // Quiz
    this.load.image('quiz_window', 'assets/quiz/quiz_window.png');
    this.load.image('quiz_button_A', 'assets/quiz/quiz_button_A.png');
    this.load.image('quiz_button_B', 'assets/quiz/quiz_button_B.png');
    this.load.image('quiz_button_C', 'assets/quiz/quiz_button_C.png');
    this.load.image('uni_quiz_logo', 'assets/quiz/uniQuiz.png');
    this.load.spritesheet('continue_button', 'assets/quiz/continue_button.png', { frameWidth: 192, frameHeight: 52 });
    // ------------------------------------------------------------------
    // Players
    // Standard
    this.load.spritesheet("player1_0", "assets/player/player1_0.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2_0", "assets/player/player2_0.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3_0", "assets/player/player3_0.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4_0", "assets/player/player4_0.png", { frameWidth: 256, frameHeight: 256 });
    // Powerup Rexona
    this.load.spritesheet("player1_1", "assets/player/player1_1.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2_1", "assets/player/player2_1.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3_1", "assets/player/player3_1.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4_1", "assets/player/player4_1.png", { frameWidth: 256, frameHeight: 256 });
    // Powerup Omo
    this.load.spritesheet("player1_2", "assets/player/player1_2.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2_2", "assets/player/player2_2.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3_2", "assets/player/player3_2.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4_2", "assets/player/player4_2.png", { frameWidth: 256, frameHeight: 256 });
    // Powerup Kibon
    this.load.spritesheet("player1_3", "assets/player/player1_3.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2_3", "assets/player/player2_3.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3_3", "assets/player/player3_3.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4_3", "assets/player/player4_3.png", { frameWidth: 256, frameHeight: 256 });
    //-------------------------------------------------------------------
    // Anims
    this.load.spritesheet("projectile0", "./assets/player/projectiles/projectile_rexonna2.png", { frameWidth: 254, frameHeight: 232 });
    this.load.spritesheet("projectile1", "./assets/player/projectiles/projectile_omo.png", { frameWidth: 254, frameHeight: 232 });
    this.load.spritesheet("projectile2", "./assets/player/projectiles/projectile_kibom2.png", { frameWidth: 254, frameHeight: 232 });
    this.load.spritesheet("dash_anim", "assets/player/dash.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("collect_sprite", "assets/player/collect_sprite.png", { frameWidth: 256, frameHeight: 208 });
    //-------------------------------------------------------------------
    // enemies
    this.load.spritesheet('green_slime', 'assets/enemies/green_slime.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('purple_slime', 'assets/enemies/purple_slime.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('graySmoke', 'assets/enemies/smoke.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('blackSmoke', 'assets/enemies/smokeBlack.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('boss_level2', 'assets/sprites/Enemy/treeboss.png', {frameWidth:192,frameHeight:176});
    this.load.spritesheet('boss_level2_projectile', 'assets/player/projectiles/bolaMarromArvore.png', {frameWidth:102,frameHeight:102});
    this.load.spritesheet('boss_level3_projectile', 'assets/player/projectiles/bolaRoxaLama.png', {frameWidth:102,frameHeight:102});

    // ------------------------------------------------------------------
    //level 3 enemies
    this.load.spritesheet('boss_level3', 'assets/sprites/Enemy/mud_idle4X.png', {frameWidth:248,frameHeight:256});
    //-------------------------------------------------------------------
    // Npcs
    this.load.spritesheet("computer_sprite", "assets/level1/computer.png", { frameWidth: 320, frameHeight: 192 });
    this.load.spritesheet("rexona_sprite", "assets/level1/rexona.png", { frameWidth: 128, frameHeight: 192 });
    this.load.image('reuniaoTeams', 'assets/level1/reuniaoTeams.png');
    this.load.image("Ekey", "assets/player/E.png");
    this.load.spritesheet('omo_sprite', 'assets/level2/omo.png', {frameWidth: 100, frameHeight: 160})
    this.load.spritesheet('kibon_sprite', 'assets/level3/kibon-sheet.png', {frameWidth: 128, frameHeight: 128})
    this.load.spritesheet('diretora_npc', 'assets/npc/diretora_npc.png', { frameWidth: 256, frameHeight: 256});

    // Completed
    this.load.once('complete', () => {
      console.log('Assets Loaded');
      this.startSelectScreen();
    })
  }

  startSelectScreen() {
    console.log('Player Select');
    this.scene.start("playerSelect", {titleMusicObject: this.sys.settings.data.titleMusicObject})
  }
}
