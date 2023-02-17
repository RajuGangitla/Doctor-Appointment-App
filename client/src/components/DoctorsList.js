import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DoctorsList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`doctor/book-appointment/${doctor._id}`)}
        key={doctor._id}
      >
        <div className="card-header">
          <h5>
            Dr. {doctor.firstName} {doctor.lastName}
          </h5>
        </div>
        <div className="card-body">
          <p>
            <b>Specialization :</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience :</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation :</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default DoctorsList;

const Wrapper = styled.div`
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 330px;
    height: 170px;
  }

  .card-header {
    background-color: #263238;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    color: white;
  }

  .card-header h5 {
    margin: 0;
  }

  .card-body {
    padding: 10px;
    background-color: #ffff00;
  }

  .card-body p {
    margin: 5px 0;
  }

  .card-body p b {
    display: inline-block;
    width: 200px;
  }

  .card:hover {
    box-shadow: 0 4px 8px #263238;
  }

`;
