export default class HealthBar {
  constructor(scene, x , y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0)

    this.x = x;
    this.y = y;
    this.value = health;

    this.size = {
      width: 300,
      height: 50,
    }

    this.pixelPerHealth = this.size.width / this.value

    scene.add.existing(this.bar)
    this.draw(x, y)
  }

  restoreHp() {
    this.value = 100
    this.draw(this.x, this.y)
  }

  currentHp() {
    return this.value
  }

  decrease(amount) {
    this.value -= amount
    this.draw(this.x, this.y)
  }

  draw(x, y) {
    this.bar.clear()
    const { width, height } = this.size

    const margin = 6
    this.bar.fillStyle(0x00000)
    this.bar.fillRect(x, y, width + margin, height+margin)

    this.bar.fillStyle(0xFFFFFF)
    this.bar.fillRect(x + margin, y + margin, width - margin * 2, height - margin * 2)

    const healthWidth = Math.floor(this.value * this.pixelPerHealth)

    this.bar.fillStyle(0x00FF00)
    this.bar.fillRect(x + margin, y + margin, Math.max(0, healthWidth - margin * 2), height - margin * 2)
  }
}
