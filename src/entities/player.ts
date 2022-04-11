import 'phaser';
import { Crosshair } from '../hud/crosshair';
import Wizard from '../assets';
import { checkDirection, MovementSettings } from '../keyboardBindings';
import { Entity } from './entity';

const nameof = <T>(name: Extract<keyof T, string>): string => name;

const Movement: MovementSettings[] = [
    {
        Name: "Down",
        Keys: [Phaser.Input.Keyboard.KeyCodes.S, Phaser.Input.Keyboard.KeyCodes.DOWN],
        Textures: [Wizard.Down],
        Math: (player) => player.sprite.y += player.velocity
    },
    {
        Name: "Left",
        Keys: [Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.LEFT],
        Textures: [Wizard.Left, Wizard.LeftAlt],
        Math: (player) => player.sprite.x -= player.velocity
    },
    {
        Name: "Right",
        Keys: [Phaser.Input.Keyboard.KeyCodes.D, Phaser.Input.Keyboard.KeyCodes.RIGHT],
        Textures: [Wizard.Right, Wizard.RightAlt],
        Math: (player) => player.sprite.x += player.velocity
    },
    {
        Name: "Up",
        Keys: [Phaser.Input.Keyboard.KeyCodes.W, Phaser.Input.Keyboard.KeyCodes.UP],
        Textures: [Wizard.Down],
        Math: (player) => player.sprite.y -= player.velocity
    },
]

export class Player extends Entity {
    private crosshair!: Crosshair;
    public sprite!: Phaser.GameObjects.Image;
    public get interval(): number {
        return this._interval;
    }

    public get velocity(): number {
        return this._velocity;
    }

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this._velocity = 0.4;

        // Create listeners for all keys created in movement
        Movement.forEach(direction => {
            direction.Keys.forEach(key => {
                this.scene.input.keyboard.addKey(key);
            });
        });
    }

    public preload = () => {

        const loadImage = (fileName: string) => {
            this.scene.load.image(nameof(fileName), fileName);
        }

        Object.values(Wizard).forEach(x=>loadImage(x));
    }

    public create = () => {
        this.sprite = this.scene.add.image(400, 300, Wizard.Down).setScale(5, 5);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.crosshair.onMouseMove(event);
    }

    public update = (t: number, dt: number) => {
        // Check if every key that has been added to movement has been pressed.
        Movement.forEach(direction => checkDirection(this, direction, t));
    }
}
