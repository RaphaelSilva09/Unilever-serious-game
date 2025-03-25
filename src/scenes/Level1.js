import Player from "../entities/Player.js";
import Npc from "../entities/Npc.js";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
    this.zoomFactor = 1
  }

  create () {
    // Play level1 sounds
    this.createSounds()

    // FadeIn Effect
    this.cameras.main.fadeIn(5000, 30, 30, 0)

    // Background
    this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones)

    // Add player to scene
    const playerSelecionado = this.sys.settings.data.playerSelecionado;
    const player = this.createPlayer(playerZones, playerSelecionado)
    .setScale(1.3)

    // ComputerNpc sprite
    const computerNpc = new Npc(this, 580, 615, 'computer_sprite', 'computer', player)
      .setScale(0.9)
      .setSize(150, 120)

    // RexonaNpc sprite
    const rexonaNpc = new Npc(this, 925, 580, 'rexona_sprite', 'rexona', player)
    .setScale(0.6)
    .setSize(150, 120)

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms
    }})
    this.createEndOfLevel(playerZones.end, player)
    this.setupFollowupCameraOn(player, map)
  }

  createPlayer({start}, playerSelecionado, oldPlayer) {
    return new Player(this, start.x, start.y, playerSelecionado, oldPlayer);
  }

  // Uses endZone from Tiled and change level when overlapping
  createEndOfLevel(end, player, playerSelecionado) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setSize(1, 400)
      .setAlpha(0)

    // Change level logic, sounds and camera effect
    this.physics.add.overlap(player, endOfLevel, () => {
      this.doorSound.play();
      this.musicSound.stop();

      console.log("Next level allowed?: " + player.allowedNextLevel);

      if(player.allowedNextLevel) {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
          if(progress === 1) this.scene.start("level2", {player: player, playerSelecionado: playerSelecionado});
        });
      }
    });

  }

  // addCollider() is a function built-in player
  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platforms);
  }

  createMap() {
    const map = this.make.tilemap({key: `level1`});
    map.addTilesetImage('level1_t1', `level1_t1`);
    map.addTilesetImage('level1_t2', `level1_t2`);
    map.addTilesetImage('level1_t3', `level1_t3`);
    return map;
  }

  // Split map layers and return layers object
  createLayers(map) {
    const tileset1 = map.getTileset('level1_t1');
    const tileset2 = map.getTileset('level1_t2');
    const tileset3 = map.getTileset('level1_t3');

    const bg = map.createLayer('bg', [tileset1, tileset2, tileset3]);
    const platforms = map.createLayer('platforms', tileset1);
    const env = map.createLayer('env', [tileset2, tileset3]);
    const playerZones = map.getObjectLayer('player_zones');

    platforms.setCollisionByExclusion(-1, true);

    return { bg, env, platforms, playerZones };
  }

  // Return the start and end zone from Tiled
  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects
    return {
      start: playerZones.find(zone => zone.name === 'startZone'),
      end: playerZones.find(zone => zone.name === 'endZone')
    }
  }
  // Setup camera
  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels) // Set camera boundaries
    this.cameras.main.startFollow(player, true) // Camera follows player
  }

  // Handle sounds logics
  createSounds() {
    // Play Open audio
    this.sound.add("open_level1", {loop: false, volume: 0.15}).play();
    this.doorSound = this.sound.add('door_sound', {loop: false, volume: 0.7})

    //starts playing music
    this.musicSound = this.sound.add("music_level1", {loop: false, volume: 0.2});

    // start playing music if not playing already
    if (!this.musicSound.isPlaying)
      this.musicSound.play();
  }
}
