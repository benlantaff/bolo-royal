import Bullet from "./Bullet.js";
export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    let playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });

    let playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });

    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });

    this.setExistingBody(compoundBody);
    this.inputKeys = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.bullets = scene.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });
  }

  static preload(scene) {
    console.log("preload");
    scene.load.atlas(
      "tank",
      "../src/assets/tank_atlas.png",
      "../src/assets/tank_atlas.json"
    );
    scene.load.image("bullet", "../src/assets/bullet.png");
  }

  update() {
    const speed = 1;
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      this.angle -= 1.5;
    } else if (this.inputKeys.right.isDown) {
      this.angle += 1.5;
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
      playerVelocity.setToPolar(this.rotation, 1);
    }

    if (this.inputKeys.space.isDown) {
      this.fireBullet();
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }

  fireBullet() {
    const bullet = this.bullets.getFirstDead(false);
    if (bullet) {
      bullet.fire(this.x, this.y, this.rotation);
    } else {
      const newBullet = new Bullet(this.scene, this.x, this.y, "bullet");
      this.bullets.add(newBullet);
      newBullet.fire(this.x, this.y, this.rotation);
    }
  }
}
