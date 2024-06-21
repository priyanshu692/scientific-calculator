// src/components/Calculator.js
import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Display from "./Display";
import Confetti from "./Confetti";
import { evaluate } from "mathjs";

const CalculatorWrapper = styled.div`
  max-width: 810px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.buttonBackground};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
`;

const buttonLabels = [
  "(",
  ")",
  "mc",
  "m+",
  "m-",
  "mr",
  "C",
  "+/-",
  "%",
  "/",
  "2nd",
  "x²",
  "x³",
  "xʸ",
  "eˣ",
  "10ˣ",
  "7",
  "8",
  "9",
  "*",
  "¹/x",
  "2√x",
  "3√x",
  "ʸ√x",
  "ln",
  "log₁₀",
  "4",
  "5",
  "6",
  "-",
  "x!",
  "sin",
  "cos",
  "tan",
  "e",
  "EE",
  "1",
  "2",
  "3",
  "+",
  "Rad",
  "sinh",
  "cosh",
  "tanh",
  "π",
  "Rand",
  "0",
  ".",
  "=",
];

const isOperator = label => ["÷", "*", "-", "+", "=", "/", "*"].includes(label);

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [second, setSecond] = useState(false); // To toggle secondary functions
  const [angleMode, setAngleMode] = useState("deg"); // To toggle between degrees and radians

  const handleButtonClick = label => {
    if (label === "2nd") {
      setSecond(!second);
    } else if (label === "Rad") {
      setAngleMode(prev => (prev === "deg" ? "rad" : "deg"));
    } else if (label === "=") {
      try {
        const res = evaluate(input);
        setResult(res.toString());
        setInput(res.toString());
        if (input.includes("5") && input.includes("6")) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 2000);
        }
      } catch {
        setResult("Error");
      }
    } else if (label === "C") {
      setInput("");
      setResult("");
    } else if (label === "+/-") {
      setInput(prev => (prev ? (parseFloat(prev) * -1).toString() : ""));
    } else if (
      label === "mc" ||
      label === "m+" ||
      label === "m-" ||
      label === "mr"
    ) {
      // Handle memory functions (optional, not implemented here)
    } else if (label === "x²") {
      setInput(prev => `(${prev})^2`);
    } else if (label === "x³") {
      setInput(prev => `(${prev})^3`);
    } else if (label === "xʸ") {
      setInput(prev => `(${prev})^`);
    } else if (label === "eˣ") {
      setInput(prev => `e^(${prev})`);
    } else if (label === "10ˣ") {
      setInput(prev => `10^(${prev})`);
    } else if (label === "¹/x") {
      setInput(prev => `1/(${prev})`);
    } else if (label === "2√x") {
      setInput(prev => `sqrt(${prev})`);
    } else if (label === "3√x") {
      setInput(prev => `cbrt(${prev})`);
    } else if (label === "ʸ√x") {
      setInput(prev => `${prev}^(1/)`);
    } else if (label === "ln") {
      setInput(prev => `ln(${prev})`);
    } else if (label === "log₁₀") {
      setInput(prev => `log10(${prev})`);
    } else if (label === "x!") {
      setInput(prev => `factorial(${prev})`);
    } else if (label === "sin") {
      setInput(prev => `sin(${angleMode === "deg" ? prev + "*pi/180" : prev})`);
    } else if (label === "cos") {
      setInput(prev => `cos(${angleMode === "deg" ? prev + "*pi/180" : prev})`);
    } else if (label === "tan") {
      setInput(prev => `tan(${angleMode === "deg" ? prev + "*pi/180" : prev})`);
    } else if (label === "sinh") {
      setInput(prev => `sinh(${prev})`);
    } else if (label === "cosh") {
      setInput(prev => `cosh(${prev})`);
    } else if (label === "tanh") {
      setInput(prev => `tanh(${prev})`);
    } else if (label === "e") {
      setInput(prev => `${prev}e`);
    } else if (label === "EE") {
      setInput(prev => `${prev}e`);
    } else if (label === "π") {
      setInput(prev => `${prev}pi`);
    } else if (label === "Rand") {
      setInput(prev => `${prev}${Math.random()}`);
    } else {
      setInput(prev => {
        // Handle operator buttons
        if (isOperator(label)) {
          // Check if last character in input is an operator
          const lastChar = prev.charAt(prev.length - 1);
          if (isOperator(lastChar)) {
            // Replace last operator with current operator
            return prev.slice(0, -1) + label;
          } else {
            // Append current operator
            return prev + label;
          }
        } else {
          // Append non-operator buttons (numbers, parentheses, etc.)
          return prev + label;
        }
      });
    }
  };

  return (
    <CalculatorWrapper>
      <Display value={result || input || "0"} />
      <Confetti trigger={confetti} />
      <ButtonGrid>
        {buttonLabels.map(label => (
          <Button
            key={label}
            label={label}
            onClick={handleButtonClick}
            isOperator={isOperator(label)}
            wide={label === "0"}
          />
        ))}
      </ButtonGrid>
    </CalculatorWrapper>
  );
};

export default Calculator;
