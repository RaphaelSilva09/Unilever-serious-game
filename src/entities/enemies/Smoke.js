import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/smokeAnims.js";

export default class Smoke extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0
	constructor(scene, x, y, layerNameArray) {
		super(scene, x, y);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.colliderLayer = layerNameArray[0]
		this.name = layerNameArray[1]

		// Mixins
		Object.assign(this, collidable)

		this.init();
		this.initEvents();

		// Create Smoke anims
		Smoke.instanceCount++
		if (Smoke.instanceCount <= 1)
			initAnimations(this.scene.anims);
	}

	init() {
    this.hurtSound = this.scene.sound.add("smoke_hurt", {loop: false, volume: 0.6})
    this.dieSound = this.scene.sound.add("smoke_die", {loop: false, volume: 0.8})

		this.gravity = 1000;
		this.speed = 100
		this.timeFromLastTurn = 0

		this.body.setGravityY(this.gravity);
		this.setCollideWorldBounds(true);
		this.setOrigin(0.5, 1);
		this.setImmovable(true);
		this.setSize(120, 76.8);
		this.setScale(0.6);
		this.body.offset.x = 0;
		this.body.offset.y = 0;

		this.rayGraphics = this.scene.add.graphics({ linestyle: { width: 2, color: 0xaa00aa } })
	}

	// initiates update function on Smoke
	initEvents() {
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
	}

	update(time, delta) {
		// set Smoke movements
		if (this.body.onFloor()) {
			this.scene.time.delayedCall(400, () => {
				this.hasHit = false;
				this.play(`${this.name}_idle`, true);
				this.setVelocityX(this.speed);
			});
		}

		// creates raycast property
		const { ray, hasHit } = this.raycast(this.body, this.colliderLayer, 130, 30);

		// conditional to make the enemy stay on platform
		if (!hasHit && this.timeFromLastTurn + 100 < time) {
			this.setFlipX(!this.flipX)
			this.setVelocityX(this.speed = -this.speed)
			this.timeFromLastTurn = time
		}

		// clear old and stroke line
		this.rayGraphics.clear();
		this.rayGraphics.strokeLineShape(ray);
	}

	// raycast function
	raycast(body, layer, rayLength = 130) {
		const { x, y, width, halfHeight } = body;
		const line = new Phaser.Geom.Line();
		let hasHit = false;

		// switch case to make raycast turn according to enemy facing direction
		switch (body.facing) {
			case Phaser.Physics.Arcade.FACING_RIGHT: {
				line.x1 = x + width;
				line.y1 = y + halfHeight;
				line.x2 = line.x1 + rayLength;
				line.y2 = line.y1 + rayLength;
				break
			}
			case Phaser.Physics.Arcade.FACING_LEFT: {
				line.x1 = x;
				line.y1 = y + halfHeight;
				line.x2 = line.x1 - rayLength;
				line.y2 = line.y1 + rayLength;
				break
			}
		}

		const hits = layer.getTilesWithinShape(line);

		if (hits.length > 0) {
			hasHit = hits.some(hit => hit.index !== -1);
		}

		return { ray: line, hasHit };
	}

	takesHit(source) {
		this.health -= source.damage

		if(this.health <= 0){
      this.dieSound.play() // die sound
		  this.setTint(0xff0000)
		  this.setVelocity(0, -200)
		  this.body.checkCollision.none = true
		  this.setCollideWorldBounds(false)
		} else {
      this.hurtSound.play() // hurt sound
		  this.setAlpha(0.25);
		  this.scene.time.delayedCall(200, () => {
			  this.setAlpha(1);
		  })
		}
	  source.destroyProjectile()
	}
}
