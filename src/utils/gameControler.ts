import maps, { EmojisSimbols, EMOJIS } from "../maps";

const $canvas = document.querySelector("canvas");
const $lives = document.querySelector(".lives");

const game = $canvas?.getContext("2d");

// const map = []

export class GameControler {
  // VARS
  private static playerPosition = {
    x: 0,
    y: 0,
  };
  private static map: string[][] = [];
  private static elementSize: number;
  private static level: number;
  private static lives: number = 5;

  private static renderlives = () => {
    let hearts: string = "";
    for (let i = 0; i < this.lives; i++) {
      hearts += "🤍";
    }
    if ($lives) {
      $lives.innerHTML = hearts;
    }
  };

  private static getMap = (level: number) => {
    if (maps.length > level - 1) {
      this.level = level;
      const map = maps[level - 1];
      const mapRows = map.trim().split("\n");
      const mapRowCols = mapRows.map((row) => row.trim().split(""));
      return mapRowCols;
    }
    return this.map;
  };

  private static deleteMap = () => {
    game?.clearRect(0, 0, Number($canvas?.width), Number($canvas?.width));
  };

  static startGame = (): void => {
    this.renderlives();
    this.map = this.getMap(1);

    if ($canvas && game) {
      $canvas.width = $canvas.clientHeight;
      $canvas.height = $canvas.clientHeight;
      const elementSize = $canvas.clientHeight / this.map.length - 2;
      this.elementSize = elementSize;
      game.font = `${elementSize}px Verdana`;
      this.renderElements(true);
      this.renderBtns();
    }
  };
  private static win = () => {
    const level = this.level + 1;
    this.map = this.getMap(level);
    setTimeout(() => {
      this.renderElements(true);
    }, 100);
  };

  private static levelFail = () => {
    if (this.lives > 1) this.lives -= 1;
    else {
      this.lives = 5;
      this.map = this.getMap(1);
    }
    this.renderlives();
    setTimeout(() => {
      this.renderElements(true);
    });
  };

  static renderElements = (renderPlayer?: boolean) => {
    console.log("render");

    this.deleteMap();

    this.map.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const positionX = Math.trunc(this.elementSize * colI);
        const positionY = Math.trunc(this.elementSize * (rowI + 1));
        const playerPosY = Math.trunc(this.playerPosition.y);
        const playerPosX = Math.trunc(this.playerPosition.x);
        const emoji = EMOJIS[col as EmojisSimbols];

        const diferenceX = Math.abs(playerPosX - positionX);
        const diferenceY = Math.abs(playerPosY - positionY);

        if (diferenceX < 2 && diferenceY < 2 && !renderPlayer) {
          if (emoji === EMOJIS["I"]) {
            this.win();
          } else if (emoji === EMOJIS["X"]) {
            this.levelFail();
          }
        }

        game?.fillText(emoji, positionX, positionY);
        if (emoji === EMOJIS["O"] && renderPlayer) {
          this.playerPosition = {
            x: positionX,
            y: positionY,
          };
          game?.fillText(
            EMOJIS["PLAYER"],
            this.playerPosition.x,
            this.playerPosition.y
          );
        }
      });
    });
  };

  static renderBtns = () => {
    const $btns = document.querySelectorAll(".btns button");
    // Recorre los elementos button dentro de .btns
    $btns.forEach((btn) => {
      // Le asigna al btn su funcion segun su ID
      if (btn.id === "up") btn.addEventListener("click", () => this.move("Up"));
      else if (btn.id === "left")
        btn.addEventListener("click", () => this.move("Left"));
      else if (btn.id === "down")
        btn.addEventListener("click", () => this.move("Down"));
      else if (btn.id === "right")
        btn.addEventListener("click", () => this.move("Right"));
    });

    // Detecta el evento de que se presiono una tecla
    document.addEventListener("keydown", (event) => {
      // Verifica que tecla se presiono y ejecuta la funcion correspondiente
      if (event.key === "ArrowUp") this.move("Up");
      else if (event.key === "ArrowLeft") this.move("Left");
      else if (event.key === "ArrowDown") this.move("Down");
      else if (event.key === "ArrowRight") this.move("Right");
    });
  };
  static move = (direction: string): void => {
    const canvasSize = Number($canvas?.height);
    const playerPosY = this.playerPosition.y;
    const playerPosX = this.playerPosition.x;

    // Cambia la posicion del jugador segun la direccion del input
    const playerSize = this.elementSize;

    if (direction === "Up" && playerPosY > playerSize)
      this.playerPosition.y -= playerSize;
    else if (direction === "Left" && playerPosX > 0)
      this.playerPosition.x -= playerSize;
    else if (direction === "Down" && playerPosY < canvasSize - playerSize)
      this.playerPosition.y += playerSize;
    else if (direction === "Right" && playerPosX < canvasSize - playerSize * 2)
      this.playerPosition.x += playerSize;

    // Renderiza los elementos para limpiar el canvas
    this.renderElements();
    game?.fillText(
      EMOJIS["PLAYER"],
      this.playerPosition.x,
      this.playerPosition.y
    );
  };
}
