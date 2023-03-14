const UNIT = 15;
const BOARD_SIZE = 750;
const GAME_STATUS = {
  READY: 1,
  PLAYING: 2,
  ENDED: 3,
};

const DIRECTION = {
  LEFT: { x: -UNIT, y: 0 },
  RIGHT: { x: +UNIT, y: 0 },
  UP: { x: 0, y: -UNIT },
  DOWN: { x: 0, y: UNIT },
};

const PLAYER_ONE = {
  color: "#CC0000",
  id: "1",
  keys: {
    38: DIRECTION.UP,
    39: DIRECTION.RIGHT,
    40: DIRECTION.DOWN,
    37: DIRECTION.LEFT,
  },
  direction: DIRECTION.DOWN,
  position: { x: UNIT * 6, y: UNIT * 6 },
  instructions: "Flechas de dirección",
};

const PLAYER_TWO = {
  color: "#0000CC",
  id: "2",
  keys: {
    87: DIRECTION.UP,
    68: DIRECTION.RIGHT,
    83: DIRECTION.DOWN,
    65: DIRECTION.LEFT,
  },
  direction: DIRECTION.UP,
  position: { x: UNIT * 43, y: UNIT * 43 },
  instructions: "Teclas AWSD",
};

export { UNIT, BOARD_SIZE, PLAYER_ONE, PLAYER_TWO, GAME_STATUS };
