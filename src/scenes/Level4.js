import Player from "../entities/Player.js";
import Npc from "../entities/Npc.js";


export default class level4 extends Phaser.Scene {
  constructor() {
    super("level4");
    this.zoomFactor = 0.7;
  }

  create() {
    console.log("level4");
    // Init all sounds in the level
    this.createSounds();

    // FadeIn effect
    this.cameras.main.fadeIn(2000, 30, 30, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    // Set world bounds based on maps
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    // // Add player object and set bounds to map pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const playerSelecionado = this.sys.settings.data.playerSelecionado;
    const player = this.createPlayer(playerZones, playerSelecionado, oldPlayer);

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
      },
    });

    //this.createEndOfLevel(playerZones.end, player, playerSelecionado);
    this.setupFollowupCameraOn(player, map);

    // DiretoraNpc sprite
    const diretoraNpc = new Npc(this, 11648, 1980, 'diretora_npc', 'diretora', player)
    .setSize(100, 120)
    .setScale(1.2)
    .setFlip(true, false)
  }

  //create player in scene
  createPlayer({ start }, playerSelecionado, oldPlayer) {
    return new Player(this, start.x, start.y, playerSelecionado, oldPlayer);
  }

  // Return the start and end zone from Tiled
  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  // Add player colliders
  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platforms);
  }

  createMap() {
    const map = this.make.tilemap({ key: `level4` });
    map.addTilesetImage("level4_t1", "level4_t1");
    map.addTilesetImage("bg_color", "bg_color");
    map.addTilesetImage("bg_cinza", "bg_cinza");
    map.addTilesetImage("bg_azul", "bg_azul");
    map.addTilesetImage("cif_logo", "cif_logo");
    map.addTilesetImage("clear_logo", "clear_logo");
    map.addTilesetImage("comfort_logo", "comfort_logo");
    map.addTilesetImage("hellmans_logo", "hellmans_logo");
    map.addTilesetImage("fofo_logo", "fofo_logo");
    map.addTilesetImage("lux_logo", "lux_logo");
    map.addTilesetImage("maizena_logo", "maizena_logo");
    map.addTilesetImage("TRES_logo", "TRES_logo");
    map.addTilesetImage("uni_logo", "uni_logo");
    return map;
  }

  createLayers(map) {
    // Add tilesets for platforms
    const tilesetPlatforms = map.addTilesetImage("level4_t1", "level4_t1");

    // Add tilesets for background and background logos
    const tilesetBgAzul = map.addTilesetImage("bg_azul", "bg_azul");
    const tilesetBgCinza = map.addTilesetImage("bg_cinza", "bg_cinza");
    const tilesetBgColor = map.addTilesetImage("bg_color", "bg_color");
    const tilesetCifLogo = map.addTilesetImage("cif_logo", "cif_logo");
    const tilesetClearLogo = map.addTilesetImage("clear_logo", "clear_logo");
    const tilesetComfortLogo = map.addTilesetImage("comfort_logo", "comfort_logo");
    const tilesetHellmansLogo = map.addTilesetImage("hellmans_logo", "hellmans_logo");
    const tilesetFofoLogo = map.addTilesetImage("fofo_logo", "fofo_logo");
    const tilesetLuxLogo = map.addTilesetImage("lux_logo", "lux_logo");
    const tilesetMaizenaLogo = map.addTilesetImage("maizena_logo", "maizena_logo");
    const tilesetTresLogo = map.addTilesetImage("TRES_logo", "TRES_logo");
    const tilesetUniLogo = map.addTilesetImage("uni_logo", "uni_logo");

    // create layers
    const env = map.createLayer("env", [tilesetBgAzul, tilesetBgCinza, tilesetBgColor]);
    const env2 = map.createLayer("env2", [
      tilesetBgAzul,
      tilesetBgColor,
      tilesetCifLogo,
      tilesetClearLogo,
      tilesetComfortLogo,
      tilesetHellmansLogo,
      tilesetFofoLogo,
      tilesetLuxLogo,
      tilesetMaizenaLogo,
      tilesetTresLogo,
      tilesetUniLogo,
    ]);
    const platforms = map.createLayer("platforms", tilesetPlatforms);
    const playerZones = map.getObjectLayer("player_zones");

    platforms.setCollisionByExclusion(-1, true);

    return { platforms, playerZones, env, env2 };
  }

  // Set up camera to follow player
  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);// Set camera boundaries
    this.cameras.main.startFollow(player, true) // Camera follows player
    this.cameras.main.setZoom(this.zoomFactor);
  }

  // Handle sounds logics
  createSounds() {
  // starts playing music
  this.musicSound = this.sound.add("music_level4", {loop: true, volume: 0.2});

  // start playing music if not playing already
    if (!this.musicSound.isPlaying)
      this.musicSound.play();
  }
}
