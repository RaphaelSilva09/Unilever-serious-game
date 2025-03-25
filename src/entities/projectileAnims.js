export default anims =>{
  // Animate the sprites
  anims.create({
    key: 'projectile_anim0',
    frames: anims.generateFrameNumbers('projectile0', { start: 0, end: 5}),
    frameRate: 6,
    repeat: -1
  });

  anims.create({
    key: 'projectile_anim1',
    frames: anims.generateFrameNumbers('projectile1', { start: 0, end: 5}),
    frameRate: 6,
    repeat: -1
  });

  anims.create({
    key: 'projectile_anim2',
    frames: anims.generateFrameNumbers('projectile2', { start: 0, end: 5}),
    frameRate: 6,
    repeat: -1
  });
}
