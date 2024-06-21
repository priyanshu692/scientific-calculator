import React from "react";
import styled from "styled-components";

const DisplayWrapper = styled.div`
  background-color: #333;
  color: white;
  font-size: 2rem;
  padding: 20px;
  text-align: right;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Display = ({ value }) => {
  return <DisplayWrapper>{value}</DisplayWrapper>;
};

export default Display;
