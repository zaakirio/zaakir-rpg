import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 528;

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create() {
    const darkFortressTilemap = this.make.tilemap({ key: "dark-fortress-map" });
    darkFortressTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < darkFortressTilemap.layers.length; i++) {
      const layer = darkFortressTilemap
        .createLayer(i, "Cloud City", 0, 0)
      layer.setDepth(i);
      layer.scale = 3;
    }
  }

  public update() {}

  public preload() {    
    this.load.image("tiles", "assets/dark-fortress.png");
    this.load.tilemapTiledJSON("dark-fortress-map", "assets/dark-fortress.json");
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Zaakir's RPG Theme'd blog",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: GameScene,
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);