import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/BossAnims.js";
import Projectiles from "../Projectiles.js";

export default class BossLevel2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, player) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.player = player

    // Mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvents();

    // Create Enemy anims
    initAnimations(scene.anims);

    // store the last attack time and setup attack interval and flag
  }

  init() {
    this.gravity = 1000;
    this.speed = 150;
    this.damage = 20
    this.health = 7
    this.isAlive = true // Used to check if enemy is alive

    this.projectiles = new Projectiles(this.scene, 'boss_level2_projectile').setDepth(2)

    this.isAttacking = false;
    this.timeFromLastAttack = 0
    this.attackDelay = this.getAttackDelay()

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setSize(110, 125);
    this.body.offset.y = 19;
    this.setFlipX(true);
    this.setScale(2);
    this.hurtSound = this.scene.sound.add("boss_hit_sound_level2", {loop: false, volume: 0.2, rate: 1.5})
    this.dieSound = this.scene.sound.add("boss2_die", {loop: false, volume: 1, rate: 1.6})
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  isAnimationPlaying(animationName) {
    return (
      this.anims.currentAnim &&
      this.anims.currentAnim.key === animationName &&
      this.anims.isPlaying
    );
  }

  update(time) {
    // Check if it's time to attack
    if (time - this.timeFromLastAttack >= this.attackDelay && !this.isAttacking && this.isAlive) {
      this.timeFromLastAttack = time;
      this.isAttacking = true;
      this.attackDelay = this.getAttackDelay()
      this.projectiles.fireProjectileBoss(this, "boss2_projectile", this.player.x, this.player.y, this.damage)
      this.play("boss2_attack", true).once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.play("boss2_idle", true);
        this.isAttacking = false;
      });
    }
  }

  getAttackDelay() {
    return Phaser.Math.Between(2500, 5000)
  }

  getProjectiles() {
    return this.projectiles.getChildren()
  }

  takesHit(source) {
    this.health -= source.damage
    if(this.health <= 0 && this.isAlive) {
      this.isAlive= false
      this.dieSound.play() // Die sound
      this.setTint(0xff0000)
      this.setVelocity(0, -200)
      this.body.checkCollision.none = true
      this.setCollideWorldBounds(false)

    } else {
      this.hurtSound.play() // Play hit sound
      this.setTint(0xff0000)
      this.scene.time.delayedCall(250, () => {
          this.clearTint();
      })
    }
    source.destroyProjectile()
  }
}
