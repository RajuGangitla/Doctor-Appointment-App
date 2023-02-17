import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import moment from "moment";
import { DatePicker, message, TimePicker } from "antd";

const BookingPage = () => {
  const { user, displaySpinner, clearSpinner } = useAppContext();
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(moment());
  const [isAvailable, setIsAvailable] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      displaySpinner();
      if (!date || !time) {
        return message.error("Please select a date and time");
      }
      const res = await axios.post(
        "/api/v1/auth/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time: moment(time).format("HH:mm"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      clearSpinner();
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return message.error("Please select a date and time");
      }
      displaySpinner();
      const res = await axios.post(
        "/api/v1/auth/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date,
          time: moment(time).format("HH:mm"),
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
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className="text-center">Booking Page</h2>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerConsultation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
                <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={true}
                format="HH:mm"
                className="mt-3"
                value={time}
                onChange={(value) => {
                  setTime(value);
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookingPage;
