/** @format */

import React, { Fragment } from "react";
import { useDropdown } from "../../contexts/dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <Fragment>
      {show && (
        <div className="absolute left-0 w-full bg-white shadow-sm top-full z-10">
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default List;
