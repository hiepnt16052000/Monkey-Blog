/** @format */

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
import { db } from "../../firebase-app/firebase-config";
import { userRole, userStatus } from "../../utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BANED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };

  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  const handleDeleteUser = (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const colRef = collection(db, "users");
    const newRef = query(colRef);

    onSnapshot(newRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setUserList(results);
    });
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Information</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => {
              return (
                <tr key={user.id}>
                  <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={user?.avatar}
                        alt="avatar"
                        className="object-cover w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3>{user.fullname}</h3>
                        <time className="text-sm text-gray-500">
                          {new Date(
                            user.createAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{renderLabelStatus(Number(user?.status))}</td>
                  <td>{renderLabelRole(Number(user?.role))}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionEdit
                        onClick={() => {
                          navigate(`/manage/update-user?id=${user.id}`);
                        }}
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteUser(user)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
