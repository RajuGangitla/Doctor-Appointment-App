import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { message, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { MdNotifications } from "react-icons/md";

const Navbar = () => {
  const { toggleSidebar, user } = useAppContext();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handlelogout = () => {
    try {
      localStorage.clear();
      message.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="notifications" onClick={()=>navigate('/notifications')}>
          <Badge count={user?.notification.length}>
            <MdNotifications className="icon1"></MdNotifications>
          </Badge>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handlelogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  h3 {
    color: yellow;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .notifications {
    background-color: yellow;
    width: 2rem;
    height: 2rem;
    border-radius: 20px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    .icon1 {
      font-size: 20px !important;
    }
  }

  background: #212121;
  .btn-container {
    background-color: yellow;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 8px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: 0.25rem;
  }
  .show-dropdown {
    visibility: visible;
    color: yellow;
    background-color: black;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: yellow;
    letter-spacing: 1px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
