import 'phaser';

export class Entity extends Phaser.GameObjects.GameObject {
    public readonly sprite!: Phaser.GameObjects.Image;
    protected _velocity!: number;
    protected _interval: number = 250;
    protected readonly _initialInterval: number = 250;
    public get interval(): number {
        return this._interval;
    }

    public get velocity(): number {
        return this._velocity;
    }

    constructor(scene: Phaser.Scene, type: string) {
        super(scene, type);
    }

    public preload = () => {

    }

    public create = () => {

    }

    public onMouseMove = (event: Phaser.Input.Pointer) => {

    }

    public update = (t: number, dt: number) => {

    }
}
