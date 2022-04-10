import 'phaser';

import phaserPng from '../assets/phaser.png';
import { Player } from '../entities/player';

export class MainScene extends Phaser.Scene {
    private image!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'MainScene' });
    }

    public preload = () => {
        this.load.image('phaser', phaserPng);
    }

    public create = () => {
        new Player(this);
        this.image = this.add.image(400, 300, 'phaser');

        this.input.on('pointerdown', (event: any) => {
            const { x, y } = event;
            this.image.x = x;
            this.image.y = y;
        });

        this.input.on('pointermove', (event: any) => {

            const { x, y } = event;
            this.image.x = x;
            this.image.y = y;
        });
    }
}
