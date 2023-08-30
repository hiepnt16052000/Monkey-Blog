/** @format */

import React from "react";
import styled from "styled-components";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 8px;
  font-style: 14px;
  font-weight: 500;
`;

const LabelStatus = ({ children, type = "default" }) => {
  let styleClassname = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassname = "text-gray-500 bg-green-100";
      break;

    case "warning":
      styleClassname = "text-gray-500 bg-yellow-100";
      break;

    case "danger":
      styleClassname = "text-gray-500 bg-red-100";
      break;

    default:
      break;
  }
  return (
    <LabelStatusStyles className={styleClassname}>{children}</LabelStatusStyles>
  );
};

export default LabelStatus;
