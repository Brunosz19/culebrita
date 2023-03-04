import React, { useReducer } from "react";
import Board from "./components/board";
import { PLAYER_ONE, PLAYER_TWO } from "./config/const";
import useInterval from "./hooks/useInterval";

const initialState = [PLAYER_ONE, PLAYER_TWO];

function updateGame(players, action) {
  if (action.type === "move") {
    const newPlayers = players.map(player => ({
      ...player,
      position: { x: player.position.x + 15, y: player.position.y}
    }))
    return newPlayers;
  }
}

function App() {
  const [players, gameDispatch] = useReducer(updateGame, initialState);

  useInterval(() => {
    gameDispatch({ type: "move" });
  }, 1000);

  return (
    <div>
      <Board players={ players } />
    </div>
  );
}

export default App;
