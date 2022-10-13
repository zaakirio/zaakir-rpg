import * as Phaser from "phaser";
import { Player } from "./Player";
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
    // Renders game world
    const darkFortressTilemap = this.make.tilemap({ key: "dark-fortress-map" });
    darkFortressTilemap.addTilesetImage("Dark Fortress", "tiles");
    for (let i = 0; i < darkFortressTilemap.layers.length; i++) {
      const layer = darkFortressTilemap
        .createLayer(i, "Dark Fortress", 0, 0)
      layer.setDepth(i);
      layer.scale = 3;
    }

    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);
    playerSprite.scale = 3;
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));

  }

  public update() {}

  public preload() {   
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 26,
      frameHeight: 36,
    });
  }
    this.load.image("tiles", "assets/dark_fortress.png");
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