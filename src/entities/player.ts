import 'phaser';
import { Crosshair } from '../hud/crosshair';
import Wizard from '../assets';

const nameof = <T>(name: Extract<keyof T, string>): string => name;

interface IMovement {
    Down: MovementContent;
    Left: MovementContent;
    Right: MovementContent;
    Up: MovementContent;
}

type MovementContent = {
    Keys: number[];
    Textures: string[];
    Math: (player: Player) => void;
}

const Movement: IMovement = {
    Down: {
        Keys: [Phaser.Input.Keyboard.KeyCodes.S, Phaser.Input.Keyboard.KeyCodes.DOWN],
        Textures: [Wizard.Down],
        Math: (player) => player.sprite.y += player.velocity
    },
    Left: {
        Keys: [Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.LEFT],
        Textures: [Wizard.Left, Wizard.LeftAlt],
        Math: (player) => player.sprite.x -= player.velocity
    },
    Right: {
        Keys: [Phaser.Input.Keyboard.KeyCodes.D, Phaser.Input.Keyboard.KeyCodes.RIGHT],
        Textures: [Wizard.Right, Wizard.RightAlt],
        Math: (player) => player.sprite.x += player.velocity
    },
    Up: {
        Keys: [Phaser.Input.Keyboard.KeyCodes.W, Phaser.Input.Keyboard.KeyCodes.UP],
        Textures: [Wizard.Down],
        Math: (player) => player.sprite.y -= player.velocity
    },
}

export class Player extends Phaser.GameObjects.GameObject {
    private crosshair!: Crosshair;
    public sprite!: Phaser.GameObjects.Image;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private _velocity!: number;
    private interval: number = 50;

    public get velocity(): number {
        return this._velocity;
    }

    private tickCount: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this._velocity = 0.4;
        this.tickCount = 0;

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
        //@ts-ignore
        Object.keys(Movement).forEach(x => this.checkDirection(Movement[x]));
    }

    private keyFinder = (key: Phaser.Input.Keyboard.Key, keys: number[]) =>
        keys.includes(key.keyCode) && key.isDown;

    private checkDirection = (movement: MovementContent) => {
        if (this.scene.input.keyboard.keys.some(x => this.keyFinder(x, movement.Keys))) {
            movement.Math(this);
            const textures = movement.Textures;
            for (let i = textures.length-1; i >= 0; i--)
            {
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
