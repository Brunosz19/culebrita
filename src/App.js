import React, { useEffect, useReducer } from "react";
import Board from "./components/board";
import GameResult from "./components/result";
import Start from "./components/start";
import {
  BOARD_SIZE,
  PLAYER_ONE,
  PLAYER_TWO,
  UNIT,
  GAME_STATUS,
} from "./config/const";
import useInterval from "./hooks/useInterval";
import getCellKey from "./utils/getCellKey";
import getPlayableCells from "./utils/playableCells";

const players = [PLAYER_ONE, PLAYER_TWO];

const initialState = {
  players,
  playableCells: getPlayableCells(
    BOARD_SIZE,
    UNIT,
    players.map((player) => getCellKey(player.position.x, player.position.y))
  ),
  gameStatus: GAME_STATUS.READY,
};

function updateGame(game, action) {
  if (action.type === "start") {
    return { ...initialState, gameStatus: GAME_STATUS.PLAYING };
  }

  if (action.type === "restart") {
    return { ...initialState, gameStatus: GAME_STATUS.READY };
  }

  if (action.type === "move") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      position: {
        x: player.position.x + player.direction.x,
        y: player.position.y + player.direction.y,
      },
    }));

    const newPlayersWithCollision = newPlayers.map((player) => {
      const myCellKey = getCellKey(player.position.x, player.position.y);
      return {
        ...player,
        hasDied:
          !game.playableCells.includes(myCellKey) ||
          newPlayers
            .filter((p) => p.id !== player.id)
            .map((p) => getCellKey(p.position.x, p.position.y))
            .includes(myCellKey),
      };
    });

    const newOcupiedCells = game.players.map((player) =>
      getCellKey(player.position.x, player.position.y)
    );

    const playableCells = game.playableCells.filter((playableCell) => {
      return !newOcupiedCells.includes(playableCell);
    });

    return {
      players: newPlayersWithCollision,
      playableCells: playableCells,
      gameStatus: newPlayersWithCollision.filter((player) => player.hasDied).length === 0
      ? GAME_STATUS.PLAYING
      : GAME_STATUS.ENDED
    };
  }

  if (action.type === "changeDirection") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      direction:
        player.keys[action.key] &&
        player.keys[action.key].x - player.direction.x !== 0 &&
        player.keys[action.key].y - player.direction.y !== 0
          ? player.keys[action.key]
          : player.direction,
    }));
    return {
      players: newPlayers,
      playableCells: game.playableCells,
      gameStatus: game.gameStatus,
    };
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);
  let result = null;
  console.log(game.gameStatus)

  useInterval(
    () => {
      gameDispatch({ type: "move" });
    },
    game.gameStatus !== GAME_STATUS.PLAYING ? null : 100
  );

  useEffect(() => {
    function handleKeyPress(event) {
      const key = `${event.keyCode}`;
      if (key === "13") {
        if (game.gameStatus === GAME_STATUS.READY) {
          handleStart();
        }
        if (game.gameStatus === GAME_STATUS.ENDED) {
          handleRestart();
        }
      }
      gameDispatch({ type: "changeDirection", key });
    }

    document.addEventListener("keydown", handleKeyPress);

    return function cleanUp() {
      document.addEventListener("keydown", handleKeyPress);
    };
  }, [game.gameStatus]);

  function handleStart() {
    gameDispatch({ type: "start" });
  }

  function handleRestart() {
    gameDispatch({ type: "restart" });
  }

  if (game.gameStatus === GAME_STATUS.ENDED) {
    const winningPlayers = game.players.filter((player) => !player.hasDied);
    if (winningPlayers.length === 0) {
      result = "Empate";
    } else {
      result = `Ganador: ${winningPlayers.map(
        (player) => `Jugador ${player.id}`
      )}`;
    }
  }

  return (
    <div>
      <h1>CULEBRITA</h1>
      <Board players={game.players} gameStatus={game.gameStatus} />
      {game.gameStatus === GAME_STATUS.ENDED && (
        <GameResult result={result} onClick={handleRestart} />
      )}
      {game.gameStatus === GAME_STATUS.READY && <Start onClick={handleStart} />}
    </div>
  );
}

export default App;
