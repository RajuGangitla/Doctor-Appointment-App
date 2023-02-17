import { message, Tabs } from "antd";
import { useAppContext } from "../../context/appContext";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { user, displaySpinner, clearSpinner , updateUser } = useAppContext();
  const navigate = useNavigate();
  const handleMarkAllRead = async () => {
    try {
      displaySpinner();
      const res = await axios.post(
        "/api/v1/auth/get-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
        updateUser(res.data.data)
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
      clearSpinner();
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      displaySpinner();
      const res = await axios.post(
        "/api/v1/auth/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
        updateUser(res.data.data)
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      clearSpinner();
    }
  };

  console.log(user);

  return (
    <div>
      <h4
        className="p-3 text-center"
        style={{ backgroundColor: "#FF6B6B", color: "#FFFFFF" }}
      >
        Notifications Page
      </h4>
      <Tabs>
        <TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-warning"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark all Read
            </button>
          </div>

          {user?.notification.map((msgs) => (
            <div
              className="card p-3 mb-3 mt-3"
              onClick={() => navigate(`${msgs.data.onClickPath}`)}
              style={{
                cursor: "pointer",
                backgroundColor: "#EAEAEA",
                borderRadius: 10,
              }}
              key={msgs.id}
            >
              <div className="card-text">{msgs.message}</div>
            </div>
          ))}
        </TabPane>
        <TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger p-2"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete all Read
            </button>
          </div>
          {user?.seenNotification.map((msgs) => (
            <div
              className="card p-3 mb-3 mt-3"
              onClick={() => navigate(`${msgs.data.onClickPath}`)}
              style={{
                cursor: "pointer",
                backgroundColor: "#EAEAEA",
                borderRadius: 10,
              }}
              key={msgs.id}
            >
              <div className="card-text">{msgs.message}</div>
            </div>
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Notifications;
