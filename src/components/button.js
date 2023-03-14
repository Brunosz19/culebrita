import React from "react";
import styled from "@emotion/styled";

const ButtonStyled = styled.button(`
  padding: 10px 30px;
  margin: 20px auto 0;
  font-size: 1.2rem;
  font-family: 'Bungee', sans-serif;
  cursor: pointer;
`);

export default function Button({ children, onClick }) {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
}
