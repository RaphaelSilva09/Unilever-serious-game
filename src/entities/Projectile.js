import initAnimations from "./projectileAnims.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    static instanceCount = 0;
    constructor(scene, x, y, sprite){
        super(scene, x + 30, y, sprite);

        scene.add.existing(this).setScale(0.8).setDepth(4)
        scene.physics.add.existing(this)

        this.speed = 800
        this.maxDistance = 1000
        this.traveledDistance = 0

        this.setSize(140, 80)
        this.body.setOffset(75, 90)

        this.damage = 1

        // this.init()
        Projectile.instanceCount++
        if (Projectile.instanceCount <= 1)
          initAnimations(this.scene.anims);
    }

    preUpdate(time, delta) {
      super.preUpdate(time, delta)
      this.traveledDistance += this.body.deltaAbsX()

      if ((this.traveledDistance >= this.maxDistance) || this.y > 4000) {
        this.body.reset(0, 0)
        this.activateProjectile(false)
        this.traveledDistance = 0
      }
    }

    fire(x, y, anim) {
      this.body.reset(x,y)
      this.activateProjectile(true)
      this.setVelocityX(this.speed)
      this.play(anim, true)
    }

    fireBoss(x, y, playerX, playerY, anim, damage) {
      // Adjust projectile size to boss
      this.setSize(120, 70)
      this.body.setOffset(0, 15)

      this.damage = damage // set boss damage

      // Calculate the vector from the boss to the player
      const dx = playerX - x
      const dy = playerY - y

      // Calculate the distance between the boss and the player
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Normalize the vector (make it length 1) and multiply by the desired speed
      const velocityX = (dx / distance) * this.speed * -1
      const velocityY = (dy / distance) * this.speed * -1

      // Set the projectile's properties and fire it
      this.body.reset(x, y)
      this.activateProjectile(true)
      this.setVelocity(velocityX, velocityY) // This method sets both the X and Y velocity
      this.play(anim, true)
    }

    // Inactive and reset projectile properties
    destroyProjectile() {
      this.activateProjectile(false)
      this.body.reset(0, 0)
      this.traveledDistance = 0 // Reset Traveled distance
    }

    // Switch on/off projectile
    activateProjectile(isActive) {
      this.setActive(isActive)
      this.setVisible(isActive)
    }
}
