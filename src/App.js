// src/App.js
import React from "react";
import Calculator from "./components/Calculator";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";

const lightTheme = {
  background: "#f0f0f0",
  buttonBackground: "#ff9621",
  buttonText: "#000000",
};

const darkTheme = {
  background: "#1c1c1c",
  buttonBackground: "#428612",
  buttonText: "#ffffff",
};

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.buttonText};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const ThemedApp = () => {
  const { theme, toggleTheme } = useTheme();
  const themeObject = theme === "light" ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={themeObject}>
      <AppWrapper>
        <ThemeToggleButton onClick={toggleTheme}>
          Toggle Theme
        </ThemeToggleButton>
        <Calculator />
      </AppWrapper>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
