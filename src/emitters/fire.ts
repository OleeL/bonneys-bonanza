import Image from '../assets/particles/flares.png';
import Json from '../assets/particles/flares.json';

export const preload = (scene: Phaser.Scene) => {
    scene.load.atlas('flares', Image, Json);
}

export const create = (scene: Phaser.Scene) => {
    const particles = scene.add.particles('flares');

    particles.createEmitter({
        frame: 'yellow',
        radial: false,
        x: 100,
        y: { start: 0, end: 560, steps: 256 },
        lifespan: 2000,
        speedX: { min: 200, max: 400 },
        quantity: 4,
        gravityY: -50,
        scale: { start: 0.6, end: 0, ease: 'Power3' },
        blendMode: 'ADD'
    });
}