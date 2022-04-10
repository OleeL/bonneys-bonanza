import 'phaser';
import phaserPng from '../assets/phaser.png';
import { Player } from '../entities/player';
import keyboardBindings from '../keyboardBindings';

export default class MainScene extends Phaser.Scene {
    public image!: Phaser.GameObjects.Image;
    public player!: Player;

    constructor() {
        super({ key: 'MainScene' });
    }

    public preload = () => {
        this.load.image('phaser', phaserPng);
    }

    public create = () => {
        this.player = new Player(this);
        this.image = this.add.image(400, 300, 'phaser');
        keyboardBindings(this);
    }

    public update = (t: number, dt: number) => {
        //console.log(t, dt);
    }
}
