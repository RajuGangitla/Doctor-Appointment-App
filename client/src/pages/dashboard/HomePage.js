import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from 'antd';
import DoctorsList from './../../components/DoctorsList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/auth/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {
          doctors && doctors.map(doctor => (
            <DoctorsList doctor={doctor}/>
          ))
        }
      </Row>
    </div>
  );
};
export default HomePage;
