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
  }

  static preload(scene) {
    console.log("preload");
    scene.load.atlas(
      "tank",
      "../src/assets/tank_atlas.png",
      "../src/assets/tank_atlas.json"
    );
  }

  update() {
    const speed = 1;
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      this.angle += -1.5;
    } else if (this.inputKeys.right.isDown) {
      this.angle += 1.5;
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
      playerVelocity.setToPolar(this.rotation, 1);
    } else if (this.inputKeys.down.isDown) {
    }

    if (this.inputKeys.x.isDown) {
      console.log("laying mine");
    } else if (this.inputKeys.space.isDown) {
      console.log("firing bullet");
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
