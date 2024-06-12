export default class Bullet extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    this.scene.add.existing(this);

    this.setScale(0.1);
    this.setIgnoreGravity(true);
  }

  fire(x, y, angle) {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.setRotation(angle);

    const speed = 2;
    const velocityX = speed * Math.cos(angle);
    const velocityY = speed * Math.sin(angle);
    this.setVelocity(velocityX, velocityY);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (
      this.y < 0 ||
      this.y > this.scene.game.config.height ||
      this.x < 0 ||
      this.x > this.scene.game.config.width
    ) {
      this.setActive(false);
      this.setVisible(false);
      this.setVelocity(0, 0); // Stop the bullet's movement
      this.body = null; // Optional: Destroy the body to free up memory
    }
  }
}
