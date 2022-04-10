import 'phaser';
import { Player } from '../entities/player';
import keyboardBindings from '../keyboardBindings';

export default class MainScene extends Phaser.Scene {
    public image!: Phaser.GameObjects.Image;
    public player!: Player;

    constructor() {
        super({ key: 'MainScene' });
    }

    public preload = () => {
        this.player = new Player(this);
        this.player.preload();
    }

    public create = () => {
        this.player.create();
        keyboardBindings(this);
    }

    public update = (t: number, dt: number) => {
        this.player.update(t, dt);
        //console.log(t, dt);
    }
}
