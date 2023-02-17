import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { HiHome } from "react-icons/hi";
import { FaListAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaHospitalUser } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();


const userLinks = [
  { id: 1, name: "Home", path: "/", icon: <HiHome /> },
  { id: 2, name: "Appointments", path: "/appointments", icon: <FaListAlt /> },
  {
    id: 3,
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <FaHospitalUser />,
  },
  { id: 4, name: "Profile", path: `/profile/${user?._id}`, icon: <ImProfile /> },
];
const adminLinks = [
  { id: 1, name: "Home", path: "/", icon: <HiHome /> },
  { id: 2, name: "Doctors", path: "/admin/doctors", icon: <FaHospitalUser /> },
  { id: 3, name: "Users", path: "/admin/users", icon: <FaUserAlt /> },
  { id: 4, name: "Profile", path: "/profile", icon: <ImProfile /> },
];
  //doctor menu
  const doctorLinks = [
    { id: 1, name: "Home", path: "/", icon: <HiHome /> },
    { id: 2, name: "Appointments", path: "doctor/appointments", icon: <FaListAlt /> },
    {
      id: 3,
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <ImProfile />,
    },
  ];

  const links = user?.isAdmin
    ? adminLinks
    : user?.isDoctor
    ? doctorLinks
    : userLinks;
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, name, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{icon}</span>
            {name}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
