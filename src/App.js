import React, { useEffect, useReducer } from "react";
import Board from "./components/board";
import { PLAYER_ONE, PLAYER_TWO } from "./config/const";
import useInterval from "./hooks/useInterval";

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

  if (action.type === "changeDirection") {
    const newPlayers = players.map((player) => ({
      ...player,
      direction: player.keys[action.key]
        ? player.keys[action.key]
        : player.direction,
      position: {
        x: player.position.x + player.direction.x,
        y: player.position.y + player.direction.y,
      },
    }));
    return newPlayers;
  }
}

function App() {
  const [players, gameDispatch] = useReducer(updateGame, initialState);

  useInterval(() => {
    gameDispatch({ type: "move" });
  }, 1000);

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
