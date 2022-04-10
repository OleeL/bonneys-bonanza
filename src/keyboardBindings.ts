import 'phaser';
import MainScene from './scenes/mainScene';

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/
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