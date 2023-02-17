import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import styled from "styled-components";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/auth/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper>
      <h1>Appointments Lists</h1>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
    </Wrapper>
  );
};

export default Appointments;

const Wrapper = styled.div`
 h1 {
  font-size: 32px;
  margin-bottom: 24px;
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: #f2f2f2; /* Add this line to change the background color */
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #ddd;
}

th {
  font-weight: bold;
  background-color: #f5f5f5;
}

tr:hover {
  background-color: #e5e5e5;
}
`;
