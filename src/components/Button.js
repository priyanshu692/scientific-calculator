// src/components/Button.js
import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  background-color: ${({ theme, isOperator }) =>
    isOperator ? theme.buttonBackground : theme.buttonBackground};
  color: ${({ theme, isOperator }) =>
    isOperator ? theme.buttonText : theme.buttonText};
  border: none;
  border-radius: 5px;
  padding: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  grid-column: ${({ wide }) => (wide ? "span 2" : "span 1")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonText};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const Button = ({ label, onClick, isOperator, wide }) => (
  <ButtonWrapper
    onClick={() => onClick(label)}
    isOperator={isOperator}
    wide={wide}
  >
    {label}
  </ButtonWrapper>
);

export default Button;
