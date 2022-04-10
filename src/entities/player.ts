import 'phaser';
import { Crosshair } from '../hud/crosshair';
import Wizard from '../assets';

const nameof = <T>(name: Extract<keyof T, string>): string => name;

interface MovementSettings {
    Name: string;
    Keys: number[];
    Textures: string[];
    Math: (player: Player) => void;
}

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

export class Player extends Phaser.GameObjects.GameObject {
    private crosshair!: Crosshair;
    public sprite!: Phaser.GameObjects.Image;
    private _velocity!: number;
    private interval: number = 50;

    public get velocity(): number {
        return this._velocity;
    }

    private tickCount: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this._velocity = 0.4;
        this.tickCount = 0;

        // Create listeners for all keys created in movement
        Object.keys(Movement).forEach(x => {
            //@ts-ignore
            Movement[x].Keys.forEach(key => {
                this.scene.input.keyboard.addKey(key);
            });
        });
    }

    public preload = () => {
        this.scene.load.image(nameof(Wizard.Down), Wizard.Down);
        this.scene.load.image(nameof(Wizard.Right), Wizard.Right);
        this.scene.load.image(nameof(Wizard.RightAlt), Wizard.RightAlt);
        this.scene.load.image(nameof(Wizard.Left), Wizard.Left);
        this.scene.load.image(nameof(Wizard.LeftAlt), Wizard.LeftAlt);
        this.scene.load.image(nameof(Wizard.RightAttack), Wizard.RightAttack);
    }

    public create = () => {
        this.sprite = this.scene.add.image(400, 300, Wizard.Down).setScale(5, 5);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.crosshair.onMouseMove(event);
    }

    public update = (t: number, dt: number) => {
        this.tickCount = (this.tickCount + 1) % this.interval;

        // Check if every key that has been added to movement has been pressed.
        //@ts-ignore
        Object.keys(Movement).forEach(x => this.checkDirection(Movement[x]));
    }

    private keyFinder = (key: Phaser.Input.Keyboard.Key, keys: number[]) =>
        keys.includes(key.keyCode) && key.isDown;

    private checkDirection = (movement: MovementSettings) => {
        if (this.scene.input.keyboard.keys.some(x => this.keyFinder(x, movement.Keys))) {
            movement.Math(this);
            const textures = movement.Textures;
            for (let i = textures.length - 1; i >= 0; i--) {
                const thisSection = i * (this.interval / textures.length);
                if (this.tickCount > thisSection) {
                    this.sprite.setTexture(textures[i]);
                    return true;
                }
            }
        }
        return false;
    }
}
