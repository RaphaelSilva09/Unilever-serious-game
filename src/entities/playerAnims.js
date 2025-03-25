export default (anims, selectedPlayer, selectedSprite) =>{
  // Define all player animation keys
  const animationKeys = [
    'player_run',
    'player_idle',
    'player_jump',
    'player_fall',
    'player_attack',
    'player_dash',
  ];

  // Remove existing animations if they exist
  animationKeys.forEach(key => {
    if (anims.exists(key)) {
      anims.remove(key);
    }
  });
  
  // Animate the sprites
  anims.create({
    key: 'player_run',
    frames: anims.generateFrameNumbers(`player${selectedPlayer}_${selectedSprite}`, { start: 10, end: 17 }),
    frameRate: 12,
    repeat: -1
  });

  anims.create({
    key: 'player_idle',
    frames: anims.generateFrameNumbers(`player${selectedPlayer}_${selectedSprite}`, { start: 18, end: 25 }),
    frameRate: 6,
    repeat: -1
  });

  anims.create({
    key: 'player_jump',
    frames: anims.generateFrameNumbers(`player${selectedPlayer}_${selectedSprite}`, { start: 8, end: 9 }),
    frameRate: 2,
    repeat: -1
  });

  anims.create({
    key: 'player_fall',
    frames: anims.generateFrameNumbers(`player${selectedPlayer}_${selectedSprite}`, { start: 6, end: 7 }),
    frameRate: 2,
    repeat: -1
  });

  anims.create({
    key: 'player_attack',
    frames: anims.generateFrameNumbers(`player${selectedPlayer}_${selectedSprite}`, { start: 26, end: 30 }),
    frameRate: 20,
    repeat: 0
  });

  anims.create({
    key: 'player_dash',
    frames: anims.generateFrameNumbers('dash_anim', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
}
