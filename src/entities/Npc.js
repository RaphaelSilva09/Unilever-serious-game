import initAnimations from './npcAnims.js'
import DialogModalPlugin from '../plugins/dialogPlugin.js'

export default class Npc extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, sprite, npcName, player) {
    super(scene, x, y, sprite)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = npcName
    this.npcPlayer = player
    this.language = this.scene.game.language

    this.questionIndex = 0; // Keep track of the current question on quiz
    this.questionsCorrectCount = 0; // Track correct answers on quiz
    this.answerTexts = []
    this.isDestroyed = false; // Track if this instance is destroyed

    this.selectSound = this.scene.sound.add('hover_sound', {loop: false, volume: 0.7})
    this.finishedDialog = false // Variable used to prevent hub from talking twice

    // Track how many Npc is in the scene
    Npc.instanceCount++;
    // This is just to not recriate animations.
    if(Npc.instanceCount <= 1) {
      initAnimations(this.scene.anims);
    }

    // Create interactKeyImage
    this.interactKeyImage = this.scene.add.image(x, y - 120, 'Ekey').setScale(0.1).setAlpha(0)

    this.init()
    this.initEvents()
  }

  async init() {
    // Update is enabled by default
    this.updateEnabled = true;
    // Set layer depth
    this.setDepth(0);
    // Set InteractKey
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    // Set dialog sound
    this.dialogSound = this.scene.sound.add('dialog_sound', {loop: false, volume: 0.5, rate: 2})

    // Set texts modularly
    try {
      const textsModule = await import(`../texts/${this.name}Texts${this.language}.js`);
      this.texts = textsModule.default;
    } catch (error) {
      console.error(`Error importing texts for ${this.name}:`, error);
      this.texts = ['Check Your text import'];
    }
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    // Do nothing if update is not enabled
    if (!this.updateEnabled)
      return;

    // When overlapping
    if (this.scene.physics.overlap(this.npcPlayer, this)) {
      this.interactKeyImage.setAlpha(1)
      this.name === 'computer' ? this.setFrame(1) : this.play(`${this.name}_overlap`, true);
      if (Phaser.Input.Keyboard.JustDown(this.interactKey))
      {
        // Which Npc are you interacting with
        switch (this.name) {
          case 'computer':
            // Computer logic
              this.computerLogic();
            break;
          case 'rexona':
              this.quizLogic('rexona');
            break;
          case 'omo':
              this.quizLogic('omo');
            break;
          case 'kibon':
              this.quizLogic('kibon');
            break;
          case 'hub':
              this.hubLogic();
            break;
          case 'hub2':
              this.hubLogic();
            break;
          case 'hub3':
              this.hubLogic();
            break;
          case 'hub4':
              this.hubLogic();
            break;
          case "diretora":
              this.diretoraLogic();
            break;
          default:
            throw new Error('Npc name not found')
        }
      }
    }
    // Not overlapping
    else if (!this.scene.physics.overlap(this.npcPlayer, this))
    {
      this.interactKeyImage.setAlpha(0)
      this.name === 'computer' ? this.setFrame(0) : this.play(`${this.name}_idle`, true);
    }
  }

  pauseUpdate() {
    this.updateEnabled = false
  }
  resumeUpdate() {
    this.updateEnabled = true
  }


  destroyInstance() {
    // If already destroyed, do nothing
    if (this.isDestroyed) return;

    // Mark this instance as destroyed
    this.isDestroyed = true;

    // Unregister the update function from the scene's update event
    this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);

    // Destroy interaction button image
    if (this.interactKeyImage)
      this.interactKeyImage.destroy()

    // Remove physics from NPC
    if (this.body) {
      this.scene.physics.world.remove(this.body)
    }

    // Destroy dialog and quiz elements
    this.destroyDialog();
    this.closeQuiz();

    // Destroy any additional dynamic elements
    if (this.dialogImage) {
      this.dialogImage.destroy();
      this.dialogImage = null;
    }

    // Ensure all interactive keys are removed
    if (this.interactKey) {
      this.interactKey.destroy();
    }

    // Finally, call the superclass destroy method
    super.destroy();
  }

  destroyDialog() {
    // Check if there is an existing dialogModal instance
    if (this.dialogModal) {
      // Destroy the dialog window
      this.dialogModal.destroy();
      this.dialogModal = null;
      this.dialogIndex = 0; // Reset the index for future interactions
    }
  }

  createDialog(texts) {
    // Check if there is an existing dialogModal instance
    if (this.dialogModal)
      this.dialogModal.destroy();

    // Create a new DialogModalPlugin instance
    this.dialogModal = new DialogModalPlugin(this.scene);
    console.log('Dialog Happening');

    // Start the dialog with the provided texts
    this.startDialog(this.dialogModal, texts, { depth: 3 });
  }

  startDialog(dialogModal, texts, options = {}) {
    // Set text for the dialog window
    dialogModal.init({
      depth: options.depth
    });

    // Initialize or increment the index based on the number of messages
    if (!this.dialogIndex || this.dialogIndex >= texts.length) {
        this.dialogIndex = 0;
    }

    dialogModal.setText(texts[this.dialogIndex], true);
    this.dialogIndex++;
  }


  // Npc's Logics
  computerLogic() {
    if (!this.dialogImage) this.dialogImage = this.scene.add.image(-290, -520, 'reuniaoTeams').setOrigin(0, 0).setDepth(2)
      if (this.dialogIndex >= this.texts.length) {
        // If all messages have been displayed, destroy the dialog window and image
        this.destroyDialog();
        this.dialogImage.destroy();
        this.dialogImage = null
        this.npcPlayer.resumeUpdate() // Player able to move when interaction is over
        this.dialogSound.pause() // pause dialog sound
      } else {
        // Show the next message
        this.createDialog(this.texts);
        this.npcPlayer.pauseUpdate() // Prevent player from moving while interacting
        this.dialogSound.stop() // Stop dialog sound
        this.dialogSound.play() // Play dialog sound
      }
  }

  // Npc's Logics
  diretoraLogic() {
      if (this.dialogIndex >= this.texts.length) {
        // If all messages have been displayed, destroy the dialog window and image
        this.destroyDialog();
        this.npcPlayer.resumeUpdate() // Player able to move when interaction is over
        this.dialogSound.pause() // pause dialog sound
        this.scene.scene.start("congrats")
      } else {
        // Show the next message
        this.createDialog(this.texts);
        this.npcPlayer.pauseUpdate() // Prevent player from moving while interacting
        this.dialogSound.stop() // Stop dialog sound
        this.dialogSound.play() // Play dialog sound
      }
  }

  quizLogic(sprite) {
    this.scene.cameras.main.setZoom(1);

    // Parse informations from texts array
    const currentQuestion = this.texts[this.questionIndex];
    const questionText = currentQuestion[0];
    const answers = currentQuestion[1];
    const correctAnswerLetter = answers[3];
    this.answerButtons = []

    let centerX = 0
    let centerY = 0

    // Get the camera's center x and y coordinates
    if(sprite === 'rexona') {
      centerX = this.scene.cameras.main.centerX;
      centerY = this.scene.cameras.main.centerY;
    } else { // Else use location of NPC
      centerX = this.npcPlayer.x;
      centerY = this.npcPlayer.y;
    }

    this.npcPlayer.pauseUpdate() // Make sure player will not move while interacting
    this.pauseUpdate() // Make sure no other interaction while interacting

    // Create quiz window
    this.quizWindow = this.scene.add.image(centerX, centerY, 'quiz_window').setDepth(2);

    // Create 'UniQuiz'
    this.quizTitle = this.scene.add.image(centerX, centerY - 200, 'uni_quiz_logo').setOrigin(0.5).setDepth(2).setScale(0.2);

    // Display the question text, creating or updating it
    this.quizText = this.scene.add.text(centerX - 400, centerY - 165, questionText, { font: '24px Arial', fill: '#000', wordWrap: {width: centerX + 100} }).setOrigin(0, 0).setDepth(2);

    // Close button logic
    this.quizXBtn = this.scene.add.sprite(centerX + 280, centerY - 190, 'continue_button').setInteractive().setDepth(3).setScale(0.8);
    this.quizXBtn.on('pointerdown', () => this.closeQuiz(true));
    this.quizXBtn.on('pointerover', () => {
      this.quizXBtn.setFrame(1)
      this.selectSound.play()
    });
    this.quizXBtn.on('pointerout', () => {
      this.quizXBtn.setFrame(0)
      this.selectSound.play()
    });

    // Display each answer button
    ['A', 'B', 'C'].forEach((letter, index) => {
        // Determine button image based on letter
        let buttonImage = `quiz_button_${letter}`;
        let answerButton = this.scene.add.image(centerX + (index * 330) - 330, centerY + 177, buttonImage).setScale(1).setInteractive().setDepth(2);
        this.answerButtons.push(answerButton)

        // Answers text
        this.answerTexts.push(this.scene.add.text(centerX - 400, centerY + (60 * index) - 95, answers[index], { font: '22px Arial', fill: '#000', wordWrap: {width: centerX + 100} }).setOrigin(0, 0).setDepth(2))

        answerButton.on('pointerover', () => {
          answerButton.setScale(1.1)
        });
        answerButton.on('pointerout', () => {
          answerButton.setScale(1)
        });
        // Checking if the selected button is the correct answer
        answerButton.on('pointerdown', () => {
            if (letter === correctAnswerLetter) {
                console.log('Correct answer!');
                this.questionsCorrectCount++; // Increase correct answers counter
                this.selectSound.play()
                answerButton.setTint(0x00ff00); // Make the button green to indicate correct answer
                this.scene.time.delayedCall(500, () => { // This delayedCall add time so player can see the button turning green
                  this.nextQuestion(sprite);
                })
            } else {
                console.log('Wrong answer!');
                this.selectSound.play()
                answerButton.setTint(0xff0000);
                this.scene.time.delayedCall(500, () => {
                  this.nextQuestion(sprite);
                })
            }
        });
    });
  }

  // Uma função recursiva para chamar o quiz novamente (não, não foi chat gpt)
  nextQuestion(sprite) {
    this.questionIndex++;
    if (this.questionIndex < this.texts.length) {
        this.resumeUpdate()
        this.closeQuiz()
        // Chama quizLogic denovo mas na proxima questão, por causa do this.questionIndex++;
        this.quizLogic(sprite)
    } else {
        console.log('End of quiz');
        this.npcPlayer.resumeUpdate() // Make sure player will not move while interacting
        this.closeQuiz()
        console.log('correct questions: '+ this.questionsCorrectCount);
        console.log('ammount of questions: '+ this.texts.length);
        if (this.questionsCorrectCount === this.texts.length)
        {
          this.npcPlayer.collectPowerUp(sprite)
          this.destroyInstance()
        }
        else {
          this.closeQuiz(true, true)
        }

        // this.destroyInstance() // Destroy instance and give powerup if everything is right
    }
  }

  closeQuiz(resume, resetVariables) {
    // Reset zoom
    this.scene.cameras.main.setZoom(this.scene.zoomFactor);
    // Close button logic to destroy the quiz interface
    if (this.quizWindow) this.quizWindow.destroy();
    if (this.quizText) this.quizText.destroy();
    if (this.quizTitle) this.quizTitle.destroy();
    this.answerButtons.forEach(button => button.destroy());
    this.answerTexts.forEach(text => text.destroy());
    if (this.quizXBtn) this.quizXBtn.destroy();

    // Resetting the flags and references
    this.quizWindow = null;
    this.quizText = null;
    this.quizTitle = null;
    this.answerButtons = [];
    this.quizXBtn = null;

    // If closeBtn clicked, resume this.update
    if(resume) this.resumeUpdate()

    // Reset Variables if needed
    if (resetVariables) {
      this.questionIndex = 0
      this.questionsCorrectCount = 0
    }

    // Allow the player to move again
    this.npcPlayer.resumeUpdate();
  }

  // Build hub images links and texts
  hubLogic() {
    this.destroyHub()
    this.scene.cameras.main.setZoom(0.85)

    // Get texts and urls from hubTexts.js
    const url1 = this.texts[0]
    const url2 = this.texts[1]
    const dialogTexts = this.texts[2]
    let allowClosing = false

    // Dialog box modal
    if(!this.finishedDialog){
      if (this.dialogIndex >= dialogTexts.length) {
        // If all messages have been displayed, destroy the dialog window and image
        this.destroyDialog();
        this.npcPlayer.resumeUpdate() // Player able to move when interaction is over
        this.dialogSound.pause() // pause dialog sound
        this.finishedDialog = true
      } else {
        // Show the next message
        this.createDialog(dialogTexts);
        this.npcPlayer.pauseUpdate() // Prevent player from moving while interacting
        this.dialogSound.stop() // Stop dialog sound
        this.dialogSound.play() // Play dialog sound
      }
    }

    // Those if's check if the element already exists so it wont double them.
    // Add hub screen and x button if they dont exist already
    if (!this.screen) this.screen = this.scene.add.image(this.npcPlayer.x, this.npcPlayer.y - 50, "hub_screen").setDepth(1)
    if (!this.xBtnLink) this.xBtnLink = this.scene.add.sprite(this.npcPlayer.x + 350, this.npcPlayer.y - 290, "continue_button").setDepth(2).setScale(0.9)
    this.xBtnLink.setAlpha(0) // Make button invisible till its allowed to click

    // Clickable links
    if (!this.link_button1) this.link_button1 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y - 110  - 50, 'hub_link_button').setDepth(2).setScale(0.5).setInteractive();
    if (!this.link_button2) this.link_button2 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y - 20 - 70, 'hub_link_button').setDepth(2).setScale(0.5).setInteractive();

    // Add text labels
    if (!this.text_hub_1) this.text_hub_1 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y - 130 - 50, url1[1], { font: '40px Arial', fill: '#0060bb' }).setDepth(2);
    if (!this.text_hub_2) this.text_hub_2 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y - 40 - 70, url2[1], { font: '40px Arial', fill: '#0060bb' }).setDepth(2);

     // Draw progress bar background if it doesn't exist
    if (!this.progressBarBg) {
      this.progressBarBg = this.scene.add.graphics().setDepth(2);
      this.progressBarBg.fillStyle(0xffffff, 1); // Grey color for the background
      this.progressBarBg.fillRect(this.npcPlayer.x - 450, this.npcPlayer.y - 50, 880, 40); // Position and size of the progress bar background
    }

    // Draw checkpoint visual insight if it doesn't exist
    if (!this.checkpoint_word) this.checkpoint_word = this.scene.add.image(this.npcPlayer.x, this.npcPlayer.y + 90, "checkpoint_word").setDepth(1)
    if (!this.checkpoint_blue_point) this.checkpoint_blue_point = this.scene.add.sprite(this.npcPlayer.x - 400, this.npcPlayer.y + 75, "checkpoint_blue_point").setScale(4).setDepth(1)
    this.checkpoint_blue_point.play('checkpoint_blue_point_idle', true)

    // Update progress bar fill based on clicksCount
    if (!this.progressBarFill) {
        this.progressBarFill = this.scene.add.graphics().setDepth(3);
    } else {
        this.progressBarFill.clear(); // Clear previous fill
    }
    this.progressBarFill.fillStyle(0x00a2ff, 1); // Blue color for the fill
    // Calculate fill width based on clicks count
    this.clicksCount = 0
    const fillWidth = this.clicksCount * (880 / 2);
    this.progressBarFill.fillRect(this.npcPlayer.x - 450, this.npcPlayer.y - 50, fillWidth, 40);

    // Initialize link clicked flags if not already done
    if (this.link1Clicked === undefined) this.link1Clicked = false;
    if (this.link2Clicked === undefined) this.link2Clicked = false;

    // Add links to the buttons
    if(this.finishedDialog){
      // Link button1
      this.link_button1.on('pointerdown', () => {
        window.open(url1[0], '_blank'); // Open in a new tab
        if (!this.link1Clicked) {
          this.link1Clicked = true; // Set the flag to indicate link 2 has been clicked
          this.clicksCount = this.link1Clicked + this.link2Clicked;
          this.updateProgressBar(); // Call a function to update the progress bar
        }
        if (this.link1Clicked && this.link2Clicked){ // If both links are clicked, do whatever
          this.npcPlayer.checkPoint() // Set checkpoint
          allowClosing = true
          this.xBtnLink.setAlpha(1)
          if (!this.checkpoint_red_point) {
            this.checkpoint_red_point = this.scene.add.sprite(this.npcPlayer.x + 400, this.npcPlayer.y + 75, "checkpoint_red_point").setScale(4).setDepth(1)
            this.checkpoint_red_point.play('checkpoint_red_point_idle', true)
            this.checkpoint_word.setFrame(1)
            this.scene.sound.add('checkpoint_sound', {loop: false, volume: 0.7}).play()
          }
        }
      });
      // Link button2
      this.link_button2.on('pointerdown', () => {
        window.open(url2[0], '_blank'); // Open in a new tab
        if (!this.link2Clicked) {
          this.link2Clicked = true; // Set the flag to indicate link 2 has been clicked
          this.clicksCount = this.link1Clicked + this.link2Clicked;
          this.updateProgressBar(); // Call a function to update the progress bar
        }
        if (this.link1Clicked && this.link2Clicked){ // If both links are clicked, do whatever
          this.npcPlayer.checkPoint() // Set checkpoint
          allowClosing = true
          this.xBtnLink.setAlpha(1)
          if (!this.checkpoint_red_point) {
            this.checkpoint_red_point = this.scene.add.sprite(this.npcPlayer.x + 400, this.npcPlayer.y + 75, "checkpoint_red_point").setScale(4).setDepth(1)
            this.checkpoint_red_point.play('checkpoint_red_point_idle', true)
            this.checkpoint_word.setFrame(1)
            this.scene.sound.add('checkpoint_sound', {loop: false, volume: 0.7}).play();
          }
        }
      });

      this.xBtnLink.on('pointerover', () => {
        this.xBtnLink.setFrame(1)
        this.selectSound.play()
      });

      this.xBtnLink.on('pointerout', () => {
        this.xBtnLink.setFrame(0)
      });

      // Hover effects
      this.link_button1.on('pointerover', () => {
        this.link_button1.setFrame(1)
        this.selectSound.play()
      });
      this.link_button2.on('pointerover', () => {
        this.link_button2.setFrame(1)
        this.selectSound.play()
      });
      this.link_button1.on('pointerout', () => {
        this.link_button1.setFrame(0)
      });
      this.link_button2.on('pointerout', () => {
        this.link_button2.setFrame(0)
      });
    }

    // Prevent player from moving while hub is opened
    this.npcPlayer.pauseUpdate()

    // Close button loginc
    this.xBtnLink.setInteractive()
    if(this.finishedDialog){
      this.xBtnLink.on('pointerdown', () => {
        this.destroyHub()
        return;
      });
    }
  }

  updateProgressBar() {
    // Calculate the fill width of the progress bar based on click count
    const fillWidth = this.clicksCount * (880 / 2);
    this.progressBarFill.clear();
    this.progressBarFill.fillStyle(0x00a2ff, 1); // Blue color for the fill
    this.progressBarFill.fillRect(this.npcPlayer.x - 450, this.npcPlayer.y - 50, fillWidth, 40); // Drawing the progress bar

    // Calculating the progress percentage
    const progressPercentage = Math.floor((this.clicksCount / 2) * 100); // Adjust if the number of clicks for 100% changes

    // Positioning and updating the percentage text
    if (!this.progressText) {
        // If the text does not exist yet, create it and center it within the progress bar
        this.progressText = this.scene.add.text(0, 0, `${progressPercentage}%`, { font: 'bold 32px Arial', fill: '#0060bb' }).setDepth(3);
        // Center the text horizontally and vertically within the progress bar
        this.progressText.setX(this.npcPlayer.x - 450 + (880 / 2) - (this.progressText.width / 2));
        this.progressText.setY(this.npcPlayer.y - 50 + (40 / 2) - (this.progressText.height / 2));
    } else {
        // If the text already exists, just update its content
        this.progressText.setText(`${progressPercentage}%`);
        // Make sure the text remains centered after the update
        this.progressText.setX(this.npcPlayer.x - 450 + (880 / 2) - (this.progressText.width / 2));
        this.progressText.setY(this.npcPlayer.y - 50 + (40 / 2) - (this.progressText.height / 2));
    }
  }


  destroyHub(){
    // Destroy images and end function
    this.scene.cameras.main.setZoom(this.scene.zoomFactor)
    this.npcPlayer.resumeUpdate()
    if (this.screen) this.screen.destroy()
    this.screen = null
    if (this.xBtnLink) this.xBtnLink.destroy()
    this.xBtnLink = null
    if (this.link_button1) this.link_button1.destroy()
    this.link_button1 = null
    if (this.link_button2) this.link_button2.destroy()
    this.link_button2 = null
    if (this.text_hub_1) this.text_hub_1.destroy()
    this.text_hub_1 = null
    if (this.text_hub_2) this.text_hub_2.destroy()
    this.text_hub_2 = null
    if (this.checkpoint_word) this.checkpoint_word.destroy()
    this.checkpoint_word = null
    if (this.checkpoint_blue_point) this.checkpoint_blue_point.destroy()
    this.checkpoint_blue_point = null
    if (this.checkpoint_red_point) this.checkpoint_red_point.destroy()
    this.checkpoint_red_point = null

    // Additionally, destroy the progress bar graphics
    if (this.progressBarBg) {
      this.progressBarBg.destroy();
      this.progressBarBg = null;
    }
    if (this.progressBarFill) {
      this.progressBarFill.destroy();
      this.progressBarFill = null;
    }

    if (this.progressText) {
      this.progressText.destroy();
      this.progressText = null;
    }

    // Reset clicks count
    this.clicksCount = 0;
    this.link1Clicked = false;
    this.link2Clicked = false;
  }
}
