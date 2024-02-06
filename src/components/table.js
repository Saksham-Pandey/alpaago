import { db, auth } from "../config/firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
export const Table = () => {
  const [userList, setUserList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");

  const usersRef = collection(db, "users");

  const getUserData = async () => {
    try {
      const data = await getDocs(usersRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  });

  const addUser = async () => {
    try {
      await addDoc(usersRef, {
        Name: newName,
        date: newDate,
        status: newStatus,
        userId: auth?.currentUser?.uid,
      });
      getUserData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCurrentUser = async (stat, id) => {
    const userDoc = doc(db, "users", id);
    if (stat === "active") {
      setUpdateStatus("inactive");
    } else {
      setUpdateStatus("active");
    }
    await updateDoc(userDoc, { status: updateStatus });
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr>
              <th>{user.Name}</th>

              <th>{user.date}</th>
              <th>{user.status}</th>
              <th>
                <button
                  onClick={() => {
                    updateCurrentUser(user.status, user.id);
                  }}>
                  Update Status
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}>
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              <input
                placeholder="Name"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </th>
            <th>
              <input
                placeholder="Date"
                onChange={(e) => {
                  setNewDate(e.target.value);
                }}
              />
            </th>
            <th>
              <input
                placeholder="status"
                onChange={(e) => {
                  setNewStatus(e.target.value);
                }}
              />
            </th>
            <th>
              <button onClick={addUser}>Add User</button>
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
