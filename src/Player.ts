export class Player {
    getPosition(): Phaser.Math.Vector2 {
      return this.sprite.getBottomCenter();
    }
  
    setPosition(position: Phaser.Math.Vector2): void {
      this.sprite.setPosition(position.x, position.y);
    }
  }