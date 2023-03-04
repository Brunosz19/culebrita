import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { BOARD_SIZE, UNIT } from "../config/const";


const CanvasBoard = styled.canvas`
  border: 1px solid #777;
  outline: 1px solid #333;
  outline-offset: 5px;
  margin-top: 25px;
`

function Board(){
  const canvasRef = useRef();

  
  useEffect(function() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath();
    context.strokeStyle = "white"

    for (let i = UNIT * 2; i <= BOARD_SIZE; i += UNIT * 2) {
      context.moveTo(i, 0);
      context.lineTo(i, BOARD_SIZE);

      context.moveTo(0, i);
      context.lineTo(BOARD_SIZE, i);
    }

    context.stroke();  
    context.closePath();
  }, []);


  return (
    <CanvasBoard ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} />  
  )
}

export default Board;