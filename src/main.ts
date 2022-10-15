import * as Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { Direction } from "./Direction";
//TODO: Update MAP for varying screen sizes
//TODO: Update collision layers for scenery artifacts
//TODO: Update character model
//TODO: Create buildings and pathways
//TODO: Enterring building logic -how to handle user enterring a building - how to handle changing scene, load new json upon enterring, will be generic rooms for projects
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

// const CANVAS_WIDTH = 5000;
// const CANVAS_HEIGHT = 1900;

export class GameScene extends Phaser.Scene {
  static readonly TILE_SIZE = 48;
  constructor() {
    super(sceneConfig);
  }

  private gridControls: GridControls;
  private gridPhysics: GridPhysics;

  public create() {
    // Init game world
    const darkFortressTilemap = this.make.tilemap({ key: "dark-fortress-map" });
    darkFortressTilemap.addTilesetImage("Dark Fortress", "tiles");
    // Init collision layer(s) for game world
    for (let i = 0; i < darkFortressTilemap.layers.length; i++) {
      const layer = darkFortressTilemap.createLayer(i, "Dark Fortress", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }
    // Init player
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);
    playerSprite.scale = 3;
    // Focus camera on player
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    // Set player location
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));
    this.gridPhysics = new GridPhysics(player, darkFortressTilemap);
    this.gridControls = new GridControls(this.input, this.gridPhysics);
    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
  }

  public update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }
  public preload() {
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 26,
      frameHeight: 36,
    });
    this.load.image("tiles", "assets/dark_fortress.png");
    this.load.tilemapTiledJSON(
      "dark-fortress-map",
      "assets/dark-fortress.json"
    );
  }

  private createPlayerAnimation(
    name: string,
    startFrame: number,
    endFrame: number
  ) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers("player", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
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
    mode: Phaser.Scale.RESIZE,
    //width: CANVAS_WIDTH,
    //height: CANVAS_HEIGHT,
    //autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);
