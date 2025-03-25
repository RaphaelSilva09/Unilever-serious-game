export default class CreditScreen extends Phaser.Scene {
  constructor() {
    super("creditScreen");
  }
  preload() {
    // load images used only in credits screen
    this.load.image(
      "credit_space",
      "../src/assets/creditScreen/credits_space.png"
    );
    this.load.spritesheet(
      "botao_voltar",
      "../src/assets/creditScreen/botao_voltar.png",
      { frameWidth: 192, frameHeight: 52 }
    );
  }

  create() {
    this.music = this.sys.settings.data.titleMusicObject;
    this.game.language = this.sys.settings.data.language;
    this.music.resume();

    // Adds background
    this.add.video(0, -100, "background_clouds").setOrigin(0,0).setScale(1.12).play(true).setPlaybackRate(0.7);
    this.title = this.add.sprite(295, 150, 'title_sheet').setOrigin(0, 0).setScale(0.2);
    this.hills = this.add.image(0, -100, "hills").setOrigin(0, 0).setScale(1.12);
    this.foreground = this.add.image(0, -100, "foreground").setOrigin(0, 0).setScale(1.12);
    this.title.anims.play('title_anim', true)

    // Add return button image and credits background
    this.add.image(640, 450, "credit_space").setScale(0.505);
    this.botaoVoltar = this.add.image(640, 660, "botao_voltar", 0);

    // Add contributtor names and its linkedin
    if (this.game.language === "Pt") {
      this.add.text(
        415,
        285,
        "                Integrantes do Grupo:\n (clique nos nomes para ver os linkedins!)",
        {
          font: "bold 25px poppins",
          color: "#000000",
          stroke: "#ffffff",
          strokeThickness: 4,
        }
      );

      this.add // Raphael
      .text(480, 370, "Raphael Silva - Programação", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/raphaelfelipesilva/");
      });
    this.add // Igor
      .text(485, 405, "Igor Sampaio Silva - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/igor-sampaio-silva/");
      });
    this.add // Thiago
      .text(468, 440, "Thiago Volcati - Documentação", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/thiago-volcati-a42a94208/");
      });
    this.add // David
      .text(468, 475, "David Deodato - Documentação", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/david-deodato-41b9b72b7/");
      });
    this.add // Otávio
      .text(455, 510, "Otávio Vasconcelos - Programação", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/otavio-vasconcelos-a11827208/"
        );
      });
    this.add // Marlos
      .text(515, 545, "Marlos Guedes - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/marlos-do-carmo-guedes-366987250/"
        );
      });
    this.add // Ricardo
      .text(515, 580, "Ricardo Planas - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/ricardo-de-toledo-planas-365b932ba?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGu6Ne8vuSuO5qUKdDrxSeA%3D%3D");
      });
    } else if (this.game.language === 'En') {
      this.add.text(
        415,
        285,
        "                    Group Members:\n    (click on names to see ours linkedins!)",
        {
          font: "bold 25px poppins",
          color: "#000000",
          stroke: "#ffffff",
          strokeThickness: 4,
        }
      );

      this.add // Raphael
      .text(480, 370, "Raphael Silva - Programming", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/raphaelfelipesilva/");
      });
    this.add // Igor
      .text(490, 405, "Igor Sampaio Silva - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/igor-sampaio-silva/");
      });
    this.add // Thiago
      .text(490, 440, "Thiago Volcati - Documents", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/thiago-volcati-a42a94208/");
      });
    this.add // David
      .text(490, 475, "David Deodato - Documents", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/david-deodato-41b9b72b7/");
      });
    this.add // Otávio
      .text(450, 510, "Otávio Vasconcelos - Programming", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/otavio-vasconcelos-a11827208/"
        );
      });
    this.add // Marlos
      .text(515, 545, "Marlos Guedes - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/marlos-do-carmo-guedes-366987250/"
        );
      });
    this.add // Ricardo
      .text(515, 580, "Ricardo Planas - Design", {
        font: "bold 25px poppins",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 4,
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/ricardo-de-toledo-planas-365b932ba?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGu6Ne8vuSuO5qUKdDrxSeA%3D%3D");
      });
    }
    
    this.botaoVoltar.setInteractive();
    this.botaoVoltar.on("pointerover", () => {
      // alterna o frame para 1 quando o mouse passa por cima
      this.botaoVoltar.setFrame(1);
    });

    this.botaoVoltar.on("pointerout", () => {
      // alterna o frame para 0 quando o mouse não está por cima
      this.botaoVoltar.setFrame(0);
    });

    // retorna para a tela de início quando clicado
    this.botaoVoltar.on("pointerdown", () => {
      this.sound.add("select_sound", { loop: false, volume: 0.7 }).play();
      this.music.pause();
      this.scene.start("titleScreen", { titleMusicObject: this.music, language: this.game.language });
    });
  }
}
