import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";


const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { displaySpinner, clearSpinner} = useAppContext()
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      displaySpinner()
      const res = await axios.post("/api/v1/auth/register", values);
      clearSpinner()
      if (res.data.success) {
        message.success("Register successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      clearSpinner()
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Wrapper>
      <div className="form-box1">
        <Form onSubmit={SubmitHandler}>
          <h3>Register</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="danger" type="submit">
            Register
          </Button>
          <Link to="/login">
            <h6>Already a User Login Here</h6>
          </Link>
        </Form>
      </div>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.div`
  .form-box1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: darkgray;
  }
  h3 {
    color: khaki;
  }
  form {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid black;
    border-radius: 8px;
    background-color: black;
  }
  form:hover {
    box-shadow: 2px 5px 6px 4px whitesmoke;
  }
  h6 {
    color: white;
    padding-top: 3px;
  }
  .form-label {
    font-size: 18px;
    color: whitesmoke;
  }
  a {
    text-decoration: none;
  }
  .form-control {
    width: 250px;
  }
`;
