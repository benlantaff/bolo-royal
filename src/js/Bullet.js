export default class Bullet extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    this.scene.add.existing(this);

    this.setScale(0.1);
    this.setIgnoreGravity(true);
    this.distanceTraveled = 0;
    this.maxDistance = 5;
  }

  fire(x, y, angle) {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.setRotation(angle);

    const speed = 2;
    // Calculate velocity components
    const velocityX = speed * Math.cos(angle);
    const velocityY = speed * Math.sin(angle);

    // Set bullet velocity
    this.setVelocity(velocityX, velocityY);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const camera = this.scene.cameras.main;
    const cameraBounds = {
      x: camera.scrollX,
      y: camera.scrollY,
      width: camera.width,
      height: camera.height,
    };

    this.distanceTraveled += Math.sqrt(
      Math.pow((this.body.velocity.x * delta) / 100, 2) +
        Math.pow((this.body.velocity.y * delta) / 100, 2)
    );

    if (
      this.y < cameraBounds.y ||
      this.y > cameraBounds.y + cameraBounds.height ||
      this.x < cameraBounds.x ||
      this.x > cameraBounds.x + cameraBounds.width ||
      this.distanceTraveled > this.maxDistance
    ) {
      this.setActive(false);
      this.setVisible(false);
      this.setVelocity(0, 0); // Stop the bullet's movement
      //this.body = null; // Optional: Destroy the body to free up memory
      this.destroy();
    }
  }
}
