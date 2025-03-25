export default (anims) => {
    anims.create({
        key: 'boss3_idle',
        frames: anims.generateFrameNumbers('boss_level3', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1,
    });

    anims.create({
        key: 'boss3_attack',
        frames: anims.generateFrameNumbers('boss_level3', { start: 7, end: 8 }),
        frameRate: 4,
        repeat: 0
    });

    anims.create({
      key: 'boss3_projectile',
      frames: anims.generateFrameNumbers('boss_level3_projectile', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    });
  };
