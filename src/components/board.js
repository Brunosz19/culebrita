import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";

const unit = 15;
const boardSize = 750;

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

    for (let i = unit * 2; i <= boardSize; i += unit * 2) {
      context.moveTo(i, 0);
      context.lineTo(i, boardSize);

      context.moveTo(0, i);
      context.lineTo(boardSize, i);
    }
    
    context.stroke();  
    context.closePath();
  }, []);


  return (
    <CanvasBoard ref={canvasRef} width={boardSize} height={boardSize} />  
  )
}

export default Board;