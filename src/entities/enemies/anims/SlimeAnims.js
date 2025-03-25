export default (anims) => {
  anims.create({
    key: "GreenSlime_jump",
    frames: anims.generateFrameNumbers("green_slime", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  anims.create({
    key: "GreenSlime_idle",
    frames: anims.generateFrameNumbers("green_slime", { start: 2, end: 0 }),
    frameRate: 2,
    repeat: -1,
  });

  anims.create({
    key: "PurpleSlime_jump",
    frames: anims.generateFrameNumbers("purple_slime", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  anims.create({
    key: "PurpleSlime_idle",
    frames: anims.generateFrameNumbers("purple_slime", { start: 2, end: 0 }),
    frameRate: 2,
    repeat: -1,
  });
};

