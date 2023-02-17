import { useState, useEffect } from "react";
import axios from "axios";
import {Table} from 'antd'

const Users = () => {
  const [users, Setusers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        Setusers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //Ant d table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} rowKey="_id"/>
    </div>
  );
};
export default Users;
