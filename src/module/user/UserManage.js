/** @format */

import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { db } from "../../firebase-app/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManageStyles = styled.div``;

const UserManage = () => {
  return (
    <UserManageStyles>
      <DashboardHeading
        title="User manage"
        desc="Manage all user"
      ></DashboardHeading>
      <div className="mb-10 flex justify-between ">
        <Button kind="primary" type="button" to="/manage/add-user">
          Add user
        </Button>
        <input
          type="text"
          placeholder="Search user..."
          className="py-4 px-5 border border-gray-500 rounded-lg"
        />
      </div>
      <UserTable></UserTable>
    </UserManageStyles>
  );
};

export default UserManage;
