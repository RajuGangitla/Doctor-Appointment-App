import { useAppContext } from "../../context/appContext";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const { user, displaySpinner, clearSpinner } = useAppContext();
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        { userId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line
  }, []);

  const handleFinish = async (values) => {
    try {
      displaySpinner();
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
      <div className="form-container">
        <h1 className="text-center">Manage Profile</h1>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor.timings[0], "HH:mm"),
                moment(doctor.timings[1], "HH:mm"),
              ],
            }}
          >
            <h4>Personal Details </h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your Phone no." />
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
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="webiste">
                  <Input type="text" placeholder="Enter your website name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your address" />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details :</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees per Consultation"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your fees" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
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
      </div>
    </Wrapper>
  );
};
export default Profile;

const Wrapper = styled.div`
  .form-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff3e0;
    border-radius: 10px;
  }

  .form-container h1,
  .form-container h4 {
    margin-bottom: 10px;
  }

  .form-container label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  .form-container input[type="text"],
  .form-container .ant-picker {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }

  .form-container .ant-picker {
    margin-bottom: 0;
  }

  .form-container .ant-picker:hover,
  .form-container .ant-picker-focused {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .form-container button[type="submit"] {
    display: block;
    width: 200px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    background-color: black;
    color: white;
    transition: background-color 0.2s ease;
  }

  .form-container button[type="submit"]:hover {
    background-color: #f44336;
  }

  @media screen and (min-width: 768px) {
    .form-container .ant-row {
      margin-bottom: 20px;
    }
  }
`;
