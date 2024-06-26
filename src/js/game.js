import MainScene from "./MainScene.js";

const config = {
  width: 512,
  height: 306,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "game",
  scene: [MainScene],
  fps: {
    target: 120,
    forceSetTimeOut: true,
  },
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};

new Phaser.Game(config);
