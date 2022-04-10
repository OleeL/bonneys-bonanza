import 'phaser';
import { Vector2 } from '../../node_modules/@graph-ts/vector2/dist/index';

export class Crosshair extends Phaser.GameObjects.GameObject {

    private position!: Vector2;
    private arc!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.position = { x: -100, y: 100 };
        this.arc = this.scene.add.circle(this.position.x, this.position.y, 10, 0xff66ff);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.arc.x = event.x;
        this.arc.y = event.y;
    }


}
