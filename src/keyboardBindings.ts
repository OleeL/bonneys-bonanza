import 'phaser';
import { Player } from './entities/player';
import MainScene from './scenes/mainScene';

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/

export interface MovementSettings {
    Name: string;
    Keys: number[];
    Textures: string[];
    Math: (player: Player) => void;
}

const keyFinder = (key: Phaser.Input.Keyboard.Key, keys: number[]) =>
    keys.includes(key.keyCode) && key.isDown;

export const checkDirection = (player: Player, movement: MovementSettings, t: number) => {
    if (player.scene.input.keyboard.keys.some(x => keyFinder(x, movement.Keys))) {
        movement.Math(player);
        const textures = movement.Textures;
        for (let i = textures.length - 1; i >= 0; i--) {
            const thisSection = i * (player.interval / textures.length);
            const tickCount = t % player.interval;

            if (tickCount > thisSection) {
                player.sprite.setTexture(textures[i]);
                return true;
            }
        }
    }
    return false;
}

export default (scene: MainScene) => {

    scene.input.on('pointerdown', (event: Phaser.Input.Pointer) => {

    });
    scene.input.on('pointermove', (event: Phaser.Input.Pointer) => {
        // const { x, y } = event;
        // this.image.x = x;
        // this.image.y = y;
        scene.player.onMouseMove(event);
    });
    // scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
    //     scene.player.onKeyboardMove(event);
    // });
}