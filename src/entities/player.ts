import 'phaser';
import { Crosshair } from '../hud/crosshair';
import Wizard from '../assets';

export class Player extends Phaser.GameObjects.GameObject {
    private crosshair!: Crosshair;
    private sprite!: Phaser.GameObjects.Image;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private velocity!: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.velocity = 8;
    }

    public preload = () => {
        this.scene.load.image(Wizard.Down, Wizardf);
        this.scene.load.image("Wizardr", Wizardr);
        this.scene.load.image("Wizardl", Wizardl);
    }

    public create = () => {
        this.sprite = this.scene.add.image(400, 300, "Wizardf").setScale(5,5);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.crosshair.onMouseMove(event);
    }

    public update = (t?: number, dt?: number) => {
        if (this.cursors.right.isDown) {
            this.sprite.x += this.velocity;
            this.sprite.setTexture("Wizardr");
        }
        if (this.cursors.left.isDown) {
            this.sprite.x -= this.velocity;
            this.sprite.setTexture("Wizardl");
        }
        if (this.cursors.up.isDown) {
            this.sprite.y -= this.velocity;
            this.sprite.setTexture("Wizardf");
        }
        if (this.cursors.down.isDown) {
            this.sprite.y += this.velocity;
            this.sprite.setTexture("Wizardf");
        }
    }
}
