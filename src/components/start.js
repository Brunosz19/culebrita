import React from "react";
import styled from "@emotion/styled";
import Button from "./button";

export const BeforeStart = styled.div(`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content:  center;
  align-items: center;
  color: #FFF;
  background-color: #00000088;
`);

export default function Start({ onClick }) {
  return (
    <BeforeStart>
      <h1> Anacondita </h1>
      <Button onClick={onClick}>Comenzar</Button>
    </BeforeStart>
  );
}
