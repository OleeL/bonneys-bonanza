import 'phaser';
import { Crosshair } from '../hud/crosshair';

export class Player extends Phaser.GameObjects.GameObject {

    private crosshair!: Crosshair;
    private sprite!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this.sprite = this.scene.add.circle(200, 200, 80, 0x6666ff);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.crosshair.onMouseMove(event);
    }

    public onKeyboardMove = (event: KeyboardEvent) => {

        console.log(event);
        if (event.key == "d")
        {
            this.sprite.x + 1000;
            console.log("moving");
        }
    }


}
