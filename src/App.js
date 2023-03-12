import React, { useEffect, useReducer } from "react";
import Board from "./components/board";
import { PLAYER_ONE, PLAYER_TWO } from "./config/const";
import useInterval from "./hooks/useInterval";
import getCellKey from "./utils/getCellKey";

const initialState = [PLAYER_ONE, PLAYER_TWO];

function updateGame(players, action) {
  if (action.type === "move") {
    const newPlayers = players.map((player) => ({
      ...player,
      position: {
        x: player.position.x + player.direction.x,
        y: player.position.y + player.direction.y,
      },
    }));
    return newPlayers;
  }

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

  const newOcupiedCells = game.

  if (action.type === "changeDirection") {
    const newPlayers = players.map((player) => ({
      ...player,
      direction:
        player.keys[action.key] &&
        player.keys[action.key].x - player.direction.x !== 0 &&
        player.keys[action.key].y - player.direction.y !== 0
          ? player.keys[action.key]
          : player.direction,
    }));
    return newPlayers;
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
      <Board players={players} />
    </div>
  );
}

export default App;
