export default class CooldownBar {
  constructor(scene, x, y, cooldownValue) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0);
    this.scene = scene

    this.x = x;
    this.y = y + 60;
    this.cooldownValue = cooldownValue;
    this.value = 0; // Initialize the cooldown as full (no cooldown).

    this.size = {
      width: 250,
      height: 30,
    };

    this.pixelPerMs = (this.size.width / this.cooldownValue);

    scene.add.existing(this.bar);

    this.draw();
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  startCooldown(cooldownValue) {
    this.cooldownValue = cooldownValue; // Update the total cooldown value.
    this.value = cooldownValue; // Reset the current value to the new cooldown value.
    this.pixelPerMs = this.size.width / cooldownValue; // Recalculate the pixels per millisecond.
  }


  update(time, delta) {
    if (this.value > 0) {
      this.value -= delta; // Decrease the cooldown value based on time elapsed.
      this.value = Math.max(this.value, 0); // Ensure value doesn't go below 0.
      this.draw(); // Redraw the cooldown bar to reflect the current cooldown state.
    }
  }

  draw() {
    this.bar.clear();
    const { width, height } = this.size;
    const margin = 6;
    const x = this.x;
    const y = this.y;

    // Draw the background of the bar
    this.bar.fillStyle(0x000000); // Example: Black for the background
    this.bar.fillRect(x, y, width + margin, height + margin);

    // Draw the foreground of the bar (the "empty" part)
    this.bar.fillStyle(0xFFFFFF);
    this.bar.fillRect(x + margin, y + margin, width - margin * 2, height - margin * 2);

    // Calculate the width for the filled portion of the cooldown bar
    const filledWidth = ((this.cooldownValue - this.value) / this.cooldownValue) * (width - margin * 2);
    this.bar.fillStyle(0x51BBFF); // Blue for the filled portion
    this.bar.fillRect(x + margin, y + margin, filledWidth, height - margin * 2);
  }
}
