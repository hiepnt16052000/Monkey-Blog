import React from "react";
import styled from "styled-components";

const LoadingSpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  /* border-bottom: ${(props) => props.borderSize} solid transparent; */
  border-radius: 100%;
  display: inline-block;
  animation: spinner 2s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ size = "30px", borderSize = "4px" }) => {
  return (
    <LoadingSpinnerStyles
      size={size}
      borderSize={borderSize}
    ></LoadingSpinnerStyles>
  );
};

export default LoadingSpinner;
