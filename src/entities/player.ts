import 'phaser';
import { Crosshair } from '../hud/crosshair';
import Wizard from '../assets';
import { checkDirection, IMovementSettings } from '../keyboardBindings';
import { Entity } from './entity';
import { Emitter } from '../emitters/fire';

const nameof = <T>(name: Extract<keyof T, string>): string => name;

//
const Movement: IMovementSettings[] = [
    {
        Name: "Sprint",
        isDown: true,
        Keys: [Phaser.Input.Keyboard.KeyCodes.SHIFT],
        Textures: [],
        Math: (player, t, dt) => {
            (player as Player).setSprint();
        }
    },
    {
        Name: "Sprint",
        isDown: false,
        Keys: [Phaser.Input.Keyboard.KeyCodes.SHIFT],
        Textures: [],
        Math: (player, t, dt) => {
            (player as Player).setWalk();
        }
    },
    {
        Name: "Down",
        isDown: true,
        Keys: [Phaser.Input.Keyboard.KeyCodes.S, Phaser.Input.Keyboard.KeyCodes.DOWN],
        Textures: [Wizard.Down],
        Math: (player, t, dt) => player.sprite.y += player.velocity * dt
    },
    {
        Name: "Left",
        isDown: true,
        Keys: [Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.LEFT],
        Textures: [Wizard.Left, Wizard.LeftAlt],
        Math: (player, t, dt) => player.sprite.x -= player.velocity * dt
    },
    {
        Name: "Right",
        isDown: true,
        Keys: [Phaser.Input.Keyboard.KeyCodes.D, Phaser.Input.Keyboard.KeyCodes.RIGHT],
        Textures: [Wizard.Right, Wizard.RightAlt],
        Math: (player, t, dt) => player.sprite.x += player.velocity * dt
    },
    {
        Name: "Up",
        isDown: true,
        Keys: [Phaser.Input.Keyboard.KeyCodes.W, Phaser.Input.Keyboard.KeyCodes.UP],
        Textures: [Wizard.Up],
        Math: (player, t, dt) => player.sprite.y -= player.velocity * dt
    },
]

export class Player extends Entity {
    private crosshair!: Crosshair;
    public sprite!: Phaser.GameObjects.Image;
    public projectiles: Emitter[] = [];


    public get interval(): number {
        return this._interval;
    }

    public get velocity(): number {
        return this._velocity;
    }

    private _sprintSpeed: number = 0.5;
    private _walkSpeed: number = 0.2;

    public setSprint = () => {
        this._velocity = this._sprintSpeed;
        this._interval = this._initialInterval * 0.6;
    }
    public setWalk = () => {
        this._velocity = this._walkSpeed;
        this._interval = this._initialInterval;
    }

    constructor(scene: Phaser.Scene) {
        super(scene, "sprite");
        this.crosshair = new Crosshair(scene);
        this._velocity = this._walkSpeed;

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

        Object.values(Wizard).forEach(x => loadImage(x));
    }

    public create = () => {
        this.sprite = this.scene.add.image(400, 300, Wizard.Down).setScale(5, 5);
    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {
        this.crosshair.onMouseMove(event);
    }

    public onPointerDown = (event: Phaser.Input.Pointer) => {
        this.projectiles.push(new Emitter(this.scene, this.sprite, event))
    }

    public update = (t: number, dt: number) => {
        // Check if every key that has been added to movement has been pressed.
        Movement.forEach(direction => checkDirection(this, direction, t, dt));
        this.projectiles.forEach(x => x.update(t, dt));

    }
}
