import React, { useEffect, useState } from "react";
import summaryApi from "../common/index";
import "../../src/App.css";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function AllUsers() {
  const [allUser, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className="bg-white pb-4">
        <table className="w-full userTable">
          <thead>
            <tr className="">
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {allUser.map((user, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{moment(user?.createdAt).format("LL")}</td>
                  <td>
                    <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white">
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ChangeUserRole />
      </div>
    </>
  );
}

export default AllUsers;
