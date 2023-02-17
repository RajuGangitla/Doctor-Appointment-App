import NavLinks from "./NavLinks";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>Doc App</header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;

const Wrapper = styled.main`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    background-color: #212121;
    .sidebar-container {
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    header{
      font-size: 30px;
      font-weight: 600;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      color: yellow;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: white;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      background: #fff176;
      padding-left: 3rem;
      color: #102a43;
    }
    .nav-link:hover .icon {
      color: black;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: 0.3s ease-in-out all;
    }
    .active {
      color: yellow;
    }
    .active .icon {
      color: yellow;
    }
  }
`;

