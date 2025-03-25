export default (anims) => {
    anims.create({
      key: "graySmoke_idle",
      frames: anims.generateFrameNumbers("graySmoke", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });

    anims.create({
      key: "blackSmoke_idle",
      frames: anims.generateFrameNumbers("blackSmoke", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });
}
  
  