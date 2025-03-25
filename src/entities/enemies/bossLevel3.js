import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/BossAnims2.js";
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
    this.lastAttackTime = 0;
    this.attackDelay = 0;
    this.isAttacking = false;
  }

  init() {
    this.gravity = 1000;
    this.speed = 150;
    this.damage = 25
    this.health = 10
    this.isAlive = true // Used to check if enemy is alive

    this.projectiles = new Projectiles(this.scene, 'boss_level3_projectile').setDepth(2)

    this.isAttacking = false;
    this.timeFromLastAttack = 0
    this.attackDelay = this.getAttackDelay()

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setSize(240, 235);
    this.body.offset.y = 19;
    this.setFlipX(true);
    this.setScale(1);

    this.hitSound = this.scene.sound.add('slime_die', {loop: false, volume: 0.3, rate: 2.3})
    this.dieSound = this.scene.sound.add('boss3_die', {loop: false, volume: 1.2, rate:1.2})
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
      this.projectiles.fireProjectileBoss(this, "boss3_projectile", this.player.x, this.player.y, this.damage)

      this.play("boss3_attack", true).once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.play("boss3_idle", true);
        this.isAttacking = false;
      });
    }
  }

  getAttackDelay() {
    return Phaser.Math.Between(2500, 3500)
  }

  getProjectiles() {
    return this.projectiles.getChildren()
  }

  takesHit(source) {
    this.health -= source.damage
    if(this.health <= 0){
      this.isAlive= false
      this.dieSound.play() // Die sound
      this.setTint(0xff0000)
      this.setVelocity(0, -200)
      this.body.checkCollision.none = true
      this.setCollideWorldBounds(false)
    } else {
      this.hitSound.play() // Play hit sound
      this.setTint(0xff0000)
      this.scene.time.delayedCall(250, () => {
          this.clearTint();
      })
    }
    source.destroyProjectile()
  }
}
