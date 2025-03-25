export default (anims) => {
    anims.create({
        key: 'boss2_idle',
        frames: anims.generateFrameNumbers('boss_level2', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
    });

    anims.create({
        key: 'boss2_attack',
        frames: anims.generateFrameNumbers('boss_level2', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });


    anims.create({
        key: 'boss2_hurt',
        frames: anims.generateFrameNumbers('boss_level2', { start: 5, end: 9 }),
        frameRate: 6,
        repeat: 0
    });

    anims.create({
        key: 'boss2_die',
        frames: anims.generateFrameNumbers('boss_level2', { start: 15, end: 17 }),
        frameRate: 6,
        repeat: 0
    });

    anims.create({
      key: 'boss2_projectile',
      frames: anims.generateFrameNumbers('boss_level2_projectile', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    });
  };
