import maps, { EmojisSimbols, EMOJIS } from "../maps";

const $canvas = document.querySelector("canvas");

const game = $canvas?.getContext("2d");

export class GameControler {
  static playerPosition = {
    x: 0,
    y: 0,
  };
  static map: string[][] = [];
  static elementSize: number;

  private static deleteMap = () => {
    game?.clearRect(0, 0, Number($canvas?.width), Number($canvas?.width));
  };

  

  static startGame = (): void => {
    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map((row) => row.trim().split(""));
    this.map = mapRowCols;

    if ($canvas && game) {
      $canvas.width = $canvas.clientHeight;
      $canvas.height = $canvas.clientHeight;
      const elementSize = $canvas.clientHeight / mapRows.length - 2;
      // game.textAlign = 'end';
      this.elementSize = elementSize;
      game.font = `${elementSize}px Verdana`;
      this.renderElements(true);
      this.renderBtns();
    }
  };

  static renderElements = (renderPlayer?: boolean) => {
    this.deleteMap();

    this.map.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const positionX = Math.round(this.elementSize * colI);
        const positionY = Math.round(this.elementSize * (rowI + 1));
        const playerPosY = Math.round(this.playerPosition.y)
        const playerPosX = Math.round(this.playerPosition.x)
        const emoji = EMOJIS[col as EmojisSimbols];

        if(emoji === EMOJIS["I"]){
          if (playerPosY === positionY && playerPosX===positionX) {
            console.log("Win");    
          }
        }

        if (emoji === EMOJIS["X"]){
          if (playerPosY === positionY && playerPosX===positionX) {
            console.log("Game over");    
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
