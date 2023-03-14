import React from "react";
import Button from "./button";
import { BeforeStart } from "./start";

export default function GameResult({ result, onClick }) {
  return (
    <BeforeStart>
      <h1>{result}</h1>
      <Button onClick={onClick}>Volver a jugar</Button>
    </BeforeStart>
  );
}
