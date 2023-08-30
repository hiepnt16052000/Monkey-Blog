/** @format */

import React from "react";
import { useDropdown } from "../../contexts/dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between px-5 py-4 text-sm transition-all cursor-pointer hover:text-primary"
    >
      {props.children}
    </div>
  );
};

export default Option;
