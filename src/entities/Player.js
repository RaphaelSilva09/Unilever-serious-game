import initAnimations from "./playerAnims.js";
import collidable from "../mixins/collidable.js";
import Projectiles from "./Projectiles.js";
import HealthBar from "../hud/healthBar.js";
import CooldownBar from "../hud/cooldownBar.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, selectedPlayer, oldPlayer) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);

    // Set old player properties when recreating
    if (oldPlayer) this.oldPlayer = oldPlayer;
    else this.oldPlayer = false;

    // Which player art will be used as sprite
    this.selectedPlayer = this.oldPlayer.selectedPlayer || selectedPlayer;

    // Track how many Npc is in the scene
    Player.instanceCount++;

    this.init();
    this.initEvents();
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.dashKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.attackKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    // Player properties
    this.setDepth(1);
    this.gravity = this.oldPlayer.gravity || 1000;
    this.body.setGravityY(this.gravity);
    this.playerSpeed = this.oldPlayer.playerSpeed || 250;
    this.jumpSpeed = this.oldPlayer.jumpSpeed || 600;
    this.jumpCount = this.oldPlayer.jumpCount || 0;
    this.consecutiveJumps = this.oldPlayer.consecutiveJumps || 1;
    this.bounceVelocity = this.oldPlayer.bounceVelocity || 250
    this.hasBeenHit = false
    this.selectedSprite = this.oldPlayer.selectedSprite || 0

    // Dev mode // true - true - true - false
    this.allowedNextLevel = false
    this.allowedToShot = this.oldPlayer.allowedToShot || false
    this.allowedToDash = this.oldPlayer.allowedToDash || false
    this.allowedVoidDeath = true

    // Projectile properties
    this.projectileCooldown = this.oldPlayer.projectileCooldown || 800; // Cooldown in milliseconds
    this.lastProjectileTime = 0; // Timestamp of the last projectile shot
    this.projectileAnimIndex = this.oldPlayer.projectileAnimIndex || 0
    this.projectiles =  new Projectiles(this.scene, `projectile${this.projectileAnimIndex}`)
    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT

    // Health and cooldown logic and setup
    const leftTopCornerX = (1280 - (1280 / 0.7)) / 2 + 20
    const leftTopCornerY = (720 - (720 / 0.7)) / 2 + 20
    this.health = 100
    this.hp = new HealthBar(this.scene, leftTopCornerX, leftTopCornerY, this.health)
    this.coolDownBar = new CooldownBar(this.scene, leftTopCornerX, leftTopCornerY, this.projectileCooldown)

    // Checkpoint
    this.checkpointCords = {x: this.x, y: this.y + 50}

    // Dash properties
    this.dashDistance = this.oldPlayer.dashSpeed || 150;
    this.dashDuration = this.oldPlayer.dashDuration || 150;
    this.canDash = this.oldPlayer.canDash || false;

    // Sounds
    this.createSounds(this.scene)

    // Allow update (prevent player from moving)
    this.updateEnabled = true;

    // Collider
    this.setSize(40, 115);
    this.body.setOffset(110, 70);
    this.setCollideWorldBounds(true);

    // This if is just to not recriate animations.
    if (Player.instanceCount <= 1)
      initAnimations(this.scene.anims, this.selectedPlayer, this.selectedSprite);
  }

  createSounds(scene) {
    this.jumpSound = scene.sound.add('jump_sound', {loop: false, volume: 0.2, rate: 1.5})
    this.shootSound = scene.sound.add('shoot_effect', {loop: false, volume: 0.3})
    this.hurtSound = scene.sound.add('player_hurt', {loop: false, volume: 1})
    switch (this.scene.sys.settings.key) {
      case "level1":
        this.walkSound = scene.sound.add("floor_sound", {loop: false, volume: 0.2, rate: 0.55});
        break;
      case "level2":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      case "level3":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      case "level4":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      // add mais dps
      default:
        break;
    }
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  pauseUpdate() {
    this.updateEnabled = false;
    this.setVelocityX(0);
    this.play('player_idle')
  }

  resumeUpdate() {
    this.updateEnabled = true;
  }

  collectPowerUp(powerup) {
    switch (powerup) {
      case 'rexona':
        console.log("Collect Rexona, allowed to shot, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.allowedToShot = true; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        this.selectedSprite = 1 // Change sprite
        initAnimations(this.scene.anims, this.selectedPlayer, this.selectedSprite); // Reset animations
        this.powerupTutorial(powerup)
        break;

      case 'omo':
        console.log("Collect Omo, projectile cooldown reduce, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.projectileAnimIndex++;
        this.projectileCooldown = 400; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        this.selectedSprite = 2 // Change sprite
        initAnimations(this.scene.anims, this.selectedPlayer, this.selectedSprite); // Reset animations
        break;

      case 'kibon':
        console.log("Collect Kibon, allowed to dash, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.projectileAnimIndex++;
        this.allowedToDash = true; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        this.selectedSprite = 3 // Change sprite
        initAnimations(this.scene.anims, this.selectedPlayer, this.selectedSprite); // Reset animations
        this.powerupTutorial(powerup)
        break;

      default:
        break;
    }
  }

  powerupTutorial(powerup) {
    // Set image spawn based on powerup
    let centerX = 0
    let centerY = 0
    if(powerup === 'rexona') {
      centerX = this.scene.cameras.main.centerX;
      centerY = this.scene.cameras.main.centerY;
    } else {
      centerX = this.x;
      centerY = this.y;
      this.scene.cameras.main.setZoom(1)
    }

    // Create window and close button logic
    if (!this.videoTutorial) this.videoTutorial = this.scene.add.video(centerX, centerY, `${powerup}Tutorial`).setDepth(2).setScale(0.5);
    this.videoTutorial.setLoop(true)
    this.videoTutorial.play()
    if (!this.XBtn) this.XBtn = this.scene.add.image(centerX + 400, centerY - 200, 'hub_close').setInteractive().setDepth(3).setScale(0.065);
    // Close button
    this.XBtn.on('pointerdown', () => {
      console.log("close");
      if (this.XBtn) this.XBtn.destroy();
      if (this.videoTutorial) {
        this.videoTutorial.destroy();
        this.videoTutorial.stop()
      }
      this.XBtn = null
      this.videoTutorial = null
      this.scene.cameras.main.setZoom(this.scene.zoomFactor)
      this.resumeUpdate() // Re-allow player movement
    });
  }

  update() { //Death logic for each level from falling
    if(this.allowedVoidDeath){
      if (this.y > 1960 && this.scene.sys.settings.key === "level2") {
        this.setPosition(this.checkpointCords.x, this.checkpointCords.y - 150);
        this.hp.restoreHp();
        console.log("Player died, respawned at checkpoint")
      }
      else if (this.y > 3100 && this.scene.sys.settings.key === "level3") {
        this.setPosition(this.checkpointCords.x, this.checkpointCords.y);
        this.hp.restoreHp();
        console.log("Player died, respawned at checkpoint")
      }
      else if (this.y > 2300 && this.scene.sys.settings.key === "level4") {
        this.setPosition(this.checkpointCords.x, this.checkpointCords.y);
        this.hp.restoreHp();
        console.log("Player died, respawned at checkpoint")
      }
    }

    // If player update is paused, do nothing
    if (!this.updateEnabled || this.hasBeenHit) {
      return;
    }

    const { left, right, down, up } = this.cursors;
    const isWJustDown = Phaser.Input.Keyboard.JustDown(this.dashKey);
    const isQJustDown = Phaser.Input.Keyboard.JustDown(this.attackKey);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (this.anims.isPlaying && this.anims.getName() === 'player_attack') {
      this.setVelocity(0, 0)
      return
    }

    // Movement and movement sound logic
    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT
      this.setFlip(true, false);
      this.setVelocityX(-this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT
      this.setFlip(false, false);
      this.setVelocityX(this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else {
      this.setVelocityX(0);
      this.play("player_idle", true);
        this.walkSound.pause();
    }

    // stops walking sounds when player jumps
    if (!this.body.onFloor() && this.walkSound.isPlaying) this.walkSound.pause()

    // Jump logic
    if (isUpJustDown && (this.body.onFloor() || this.jumpCount < this.consecutiveJumps)) {
      this.jumpCount++;
      this.setVelocityY(-this.jumpSpeed)
      this.jumpSound.play()
    }

    // Attack Logic
    if (isQJustDown && this.allowedToShot) {
      const currentTime = this.scene.time.now;

      // Check if enough time has passed
      if (currentTime - this.lastProjectileTime > this.projectileCooldown) {
        // Cooldown bar
        this.coolDownBar.startCooldown(this.projectileCooldown)
        // Shoot sound
        this.shootSound.play()
        this.projectiles.fireProjectile(this, `projectile_anim${this.projectileAnimIndex}`)

        // Update the last projectile time
        this.lastProjectileTime = currentTime;

        // Shoot anim
        this.play("player_attack", true);
      }
    }

    // Dash logic
    if (isWJustDown && this.canDash && this.allowedToDash) {
      let dashX = 0;
      let dashY = 0;

      if (left.isDown) dashX = -1;
      else if (right.isDown) dashX = 1;

      if (up.isDown) dashY = -1;
      else if (down.isDown) dashY = 1;

      this.pauseUpdate()
      this.play('player_dash', true)
      this.scene.sound.add("dash_sound", {loop: false, volume: 0.2, rate: 1.2}).play()

      // Calculate the target position for the dash
      const targetX = this.x + dashX * this.dashDistance;
      const targetY = this.y + dashY * this.dashDistance;

      this.scene.tweens.add({
        targets: this,
        x: targetX,
        y: targetY,
        duration: this.dashDuration,
        onStart: () => {
          this.body.setAllowGravity(false);
          this.body.enable = false; // Disable physics body during the dash
        },
        onComplete: () => {
          this.body.setAllowGravity(true);
          this.body.enable = true; // Re-enable physics body
        }
      });
      this.resumeUpdate()

      this.canDash = false;
    }

    // Reset `canDash` when landing on the ground
    if (this.body.onFloor() && !this.canDash && !Phaser.Input.Keyboard.JustDown(this.dashKey)) {
      this.canDash = true;
    }

    // Animation logic for jumping and falling
    if (!this.body.onFloor()) {
      this.play("player_jump", true);
      if (this.body.velocity.y > 0) this.play("player_fall", true);
    }
    // Reset jump count and dash availability on landing
    if (this.body.onFloor()) {
      this.jumpCount = 0
    }

    // Prevents player from falling too fast and passing through the ground
    const maxFallSpeed = 800
    if (this.body.velocity.y > maxFallSpeed) {
      this.body.setVelocityY(maxFallSpeed)
    }
  }

  takesHit(source) {
    if (this.hasBeenHit) return

    // If source have traveledDistance propertie it is a projectile, so destroy it.
    if (source.traveledDistance) source.destroyProjectile()

    this.hurtSound.play()
    this.hasBeenHit = true // Give invulnerability
    this.hp.decrease(source.damage) // Monster damage
    // Check if player died
    if(this.hp.currentHp() < 1) {
      // Dead
      console.log("Dead");
      this.die()
    } else {
      // Hurt
      this.bounceOff()
      this.setAlpha(0.25)
      this.scene.time.delayedCall(200, () => {
        this.setAlpha(1)
      })
    }
    this.resumeUpdate()
    this.scene.time.delayedCall(1000, () => {this.hasBeenHit = false})
  }

  die() {
    // Go to checkpointCords and get full hp
    this.setPosition(this.checkpointCords.x, this.checkpointCords.y)
    this.hp.restoreHp()
  }

  bounceOff = () => {
    // if hitted by right side, bounce to right, else to left
    this.body.touching.right ?
      this.setVelocityX(-this.bounceVelocity) :
      this.setVelocityX(this.bounceVelocity)

    this.setVelocityY(-this.bounceVelocity * 2)
  }

  checkPoint() {
    // Update checkpoint
    this.checkpointCords = {x: this.x, y: this.y}
  }
}
