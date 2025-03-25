export default anims =>{
  // Animate the sprites
  anims.create({
    key: 'rexona_idle',
    frames: anims.generateFrameNumbers('rexona_sprite', { start: 0, end: 4 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'rexona_overlap',
    frames: anims.generateFrameNumbers('rexona_sprite', { start: 5, end: 9 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'hub_idle',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 0, end: 4}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub_overlap',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 5, end: 9}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'kibon_idle',
    frames: anims.generateFrameNumbers('kibon_sprite', { start: 0, end: 4 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'kibon_overlap',
    frames: anims.generateFrameNumbers('kibon_sprite', { start: 5, end: 9 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'omo_idle',
    frames: anims.generateFrameNumbers('omo_sprite', { start: 0, end: 4 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'omo_overlap',
    frames: anims.generateFrameNumbers('omo_sprite', { start: 5, end: 9 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'hub2_idle',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 0, end: 4}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub2_overlap',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 5, end: 9}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub3_idle',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 0, end: 4}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub3_overlap',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 5, end: 9}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub4_idle',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 0, end: 4}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'hub4_overlap',
    frames: anims.generateFrameNumbers('hub_sprite', {start: 5, end: 9}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'diretora_idle',
    frames: anims.generateFrameNumbers('diretora_npc', {start: 0, end: 5}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'diretora_overlap',
    frames: anims.generateFrameNumbers('diretora_npc', {start: 6, end: 11}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'checkpoint_blue_point_idle',
    frames: anims.generateFrameNumbers('checkpoint_blue_point', {start: 0, end: 3}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'checkpoint_red_point_idle',
    frames: anims.generateFrameNumbers('checkpoint_red_point', {start: 0, end: 3}),
    frameRate: 4,
    repeat: -1
  })

  anims.create({
    key: 'checkpoint_word_idle',
    frames: anims.generateFrameNumbers('checkpoint_word', {start: 0, end: 1}),
    frameRate: 1,
    repeat: 1
  })
}
