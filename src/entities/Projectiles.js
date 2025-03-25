import Projectile from "./Projectile.js";

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene, key) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key,
      classType: Projectile
    })
  }

  fireProjectile(initiator, anim){
    const projectile = this.getFirstDead(false)

    if (!projectile) return

    if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed)
      projectile.setFlipX(false)
    } else {
      projectile.speed = -Math.abs(projectile.speed)
      projectile.setFlipX(true)
    }

    projectile.fire(initiator.x, initiator.y, anim)
  }

  fireProjectileBoss(initiator, anim, playerX, playerY, damage) {
    const projectile = this.getFirstDead(false)
    const bossX = initiator.x
    const bossY = initiator.y - 150

    if (!projectile) return

    if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed)
      projectile.setFlipX(false)
    } else {
      projectile.speed = -Math.abs(projectile.speed)
      projectile.setFlipX(true)
    }

    projectile.fireBoss(bossX, bossY, playerX, playerY, anim, damage)
  }
}
