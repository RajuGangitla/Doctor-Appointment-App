import { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, Setdoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        Setdoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  //Ant d table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center m-2">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} rowKey="_id" />
    </div>
  );
};

export default Doctors;
