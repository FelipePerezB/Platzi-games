const maps: string[] = [];


export type EmojisSimbols = "-" | "O" | "X" | "I" | "PLAYER" | "BOMB_COLLISION" | "GAME_OVER" | "WIN"
export enum EMOJIS {
  "-" = " ",
  "O" = "🚪",
  "X" = "💣",
  "I" = "🎁",
  "PLAYER" = "💀",
  "BOMB_COLLISION" = "🔥",
  "GAME_OVER" = "👎",
  "WIN" = "🏆",
}

// export const emojis = {
//   '-': EMOJIS["-"],
//   'O': EMOJIS["O"],
//   'X': EMOJIS["X"],
//   'I': EMOJIS["I"],
//   'PLAYER': EMOJIS["PLAYER"],
//   'BOMB_COLLISION': EMOJIS["BOMB_COLLISION"],
//   'GAME_OVER': EMOJIS["GAME_OVER"],
//   'WIN': EMOJIS["WIN"],
// };

maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
export default maps;
