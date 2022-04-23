import 'phaser';
import { Player } from '../entities/player';
import keyboardBindings from '../keyboardBindings';
import * as Fire from '../emitters/fire';
import { Emitter } from '../emitters/fire';

export default class MainScene extends Phaser.Scene {
    public image!: Phaser.GameObjects.Image;
    public player!: Player;
    public emitter!: Emitter;

    constructor() {
        super({ key: 'MainScene' });
    }

    public preload = () => {
        this.player = new Player(this);
        this.player.preload();
        Fire.preload(this);
    }

    public create = () => {
        this.player.create();
        keyboardBindings(this);
    }

    public update = (t: number, dt: number) => {
        this.player.update(t, dt);
    }
}
