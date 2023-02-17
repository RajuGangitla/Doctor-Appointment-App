import { useAppContext } from "../../context/appContext";
import { Col, Form, Input, message, Row } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { user, displaySpinner, clearSpinner } = useAppContext();
  const params = useParams();
  console.log(params.id)
  console.log(userData)

  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/auth/updateProfile",
        { userId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  const handleFinish = async (values) => {
    try {
      displaySpinner();
      const res = await axios.post(
        "/api/v1/auth/updateProfile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      clearSpinner();
      message.error("Something went wrong");
    }
  };


  return (
    <Wrapper>
      <h1 className="text-center">Manage Profile</h1>
      {userData && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ ...userData }}
        >
          <h4>Personal Details </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button
                type="submit"
                className="btn btn-primary mt-4"
                style={{ width: 200 }}
              >
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Wrapper>
  );
};
export default UserProfile;

const Wrapper = styled.div`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    margin-top: 20px;
  }

  form h4 {
    margin-bottom: 10px;
  }

  label {
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
