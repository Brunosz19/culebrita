import React, { useEffect, useReducer } from "react";
import Board from "./components/board";
import { BOARD_SIZE, PLAYER_ONE, PLAYER_TWO, UNIT } from "./config/const";
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
};

function updateGame(game, action) {
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
    
    const newOcupiedCells = game.players.map(player => getCellKey(player.position.x, player.position.y))

    const playableCells = game.playableCells.filter(playableCell => {
      return !newOcupiedCells.includes(playableCell);
    })

    return {
      players: newPlayersWithCollision,
      playableCells: playableCells,
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
    };
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  useInterval(() => {
    gameDispatch({ type: "move" });
  }, 100);

  useEffect(() => {
    function handleKeyPress(event) {
      const key = `${event.keyCode}`;
      gameDispatch({ type: "changeDirection", key });
    }

    document.addEventListener("keydown", handleKeyPress);

    return function cleanUp() {
      document.addEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <Board players={game.players} />
    </div>
  );
}

export default App;
