import { Time } from 'phaser';
import MainScene from './scenes/mainScene';

const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	scene: [MainScene],
	time: Time
};

const game = new Phaser.Game(config);

