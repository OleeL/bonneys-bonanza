import 'phaser';

export class Player extends Phaser.GameObjects.GameObject {

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.scene.add.circle(200, 200, 80, 0x6666ff);
    }
}
