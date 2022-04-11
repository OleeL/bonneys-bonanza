import 'phaser';
import { Entity } from './entities/entity';
import MainScene from './scenes/mainScene';

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/

export interface IMovementSettings {
    // Just useful for debugging
    Name: string;
    // Is down => True, Is up => false
    isDown: boolean;
    Keys: number[];
    Textures: string[];
    Math: (entity: Entity, t: number, dt: number) => void;
}

const keyFinder = (key: Phaser.Input.Keyboard.Key, movement: IMovementSettings) =>
    movement.Keys.includes(key.keyCode) && (movement.isDown ? key.isDown : key.isUp);

export const checkDirection = (entity: Entity, movement: IMovementSettings, t: number, dt: number) => {
    if (entity.scene.input.keyboard.keys.some(x => keyFinder(x, movement))) {
        movement.Math(entity, t, dt);
        const textures = movement.Textures;
        for (let i = textures.length - 1; i >= 0; i--) {
            const thisSection = i * (entity.interval / textures.length);
            const tickCount = t % entity.interval;

            if (tickCount > thisSection) {
                entity.sprite.setTexture(textures[i]);
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
        scene.player.onMouseMove(event);
    });
    // scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
    //     scene.entity.onKeyboardMove(event);
    // });
}