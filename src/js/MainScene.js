import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    let fpsText;
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", "../src/assets/basic-map-tiles.png");
    this.load.tilemapTiledJSON("map", "../src/assets/testmap2.json");
  }

  create() {
    this.fpsText = this.add.text(40, 10, "fps", {
      font: "16px Arial",
      fill: "#Ff0000",
    });

    this.fpsText.setOrigin(0.5);
    this.fpsText.setScrollFactor(0);
    this.fpsText.setVisible(true);
    this.fpsText.setDepth(11);

    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const tileset = map.addTilesetImage(
      "basic-map-tiles",
      "tiles",
      16,
      16,
      0,
      0
    );

    const bottom = map.createLayer("Bottom", tileset, 0, 0).setScale(1.25);
    const top = map.createLayer("Top", tileset, 0, 0).setScale(1.25);

    this.matter.world.convertTilemapLayer(top);
    this.matter.world.convertTilemapLayer(bottom);

    this.player = new Player({
      scene: this,
      x: 50,
      y: 50,
      texture: "tank",
      frame: "tank1",
    }).setScale(0.3);

    this.add.existing(this.player);

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      x: Phaser.Input.Keyboard.KeyCodes.X,
    });

    this.cameras.main.setBounds(0, 0, "100%", "100%");
    this.cameras.main.startFollow(this.player, true, 1, 1);
  }

  update() {
    this.player.update();
    this.fpsText.setText(`FPS: ${Math.floor(this.game.loop.actualFps)}`);
  }
}
