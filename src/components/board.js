import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { BOARD_SIZE, GAME_STATUS, UNIT } from "../config/const";

const CanvasBoard = styled.canvas`
  border: 1px solid #777;
  outline: 1px solid #333;
  outline-offset: 5px;
  margin-top: 25px;
`;

const Instruction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

function Board({ players, gameStatus }) {
  const canvasRef = useRef();

  useEffect(
    function () {
      if (gameStatus === GAME_STATUS.READY) {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

        context.beginPath();
        context.strokeStyle = "black";

        for (let i = UNIT * 2; i <= BOARD_SIZE; i += UNIT * 2) {
          context.moveTo(i, 0);
          context.lineTo(i, BOARD_SIZE);

          context.moveTo(0, i);
          context.lineTo(BOARD_SIZE, i);
        }

        context.stroke();
        context.closePath();
      }
    },
    [gameStatus]
  );

  useEffect(
    function () {
      const context = canvasRef.current.getContext("2d");
      players.forEach((player) => {
        context.fillStyle = player.color;
        context.fillRect(player.position.x, player.position.y, UNIT, UNIT);
      });
    },
    [players]
  );

  return (
    <div>
      <CanvasBoard ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} />
      <Instruction>
        {players.map((player) => {
          return (
            <div
              style={{
                color: player.color,
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              key={`player--${player.id}`}
            >
              {`${player.id}: ${player.instructions}`}
            </div>
          );
        })}
      </Instruction>
    </div>
  );
}

export default Board;
