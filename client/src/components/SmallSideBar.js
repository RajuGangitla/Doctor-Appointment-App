import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container "
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>Doc App</header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;

const Wrapper = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: 0.3s ease-in-out all;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: #212121;
    width: 90vw;
    height: 95vh;
    border-radius: 0.25rem;
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: #842029;
    cursor: pointer;
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
    text-transform: capitalize;
    transition: 0.3s ease-in-out all;
  }
  .nav-link:hover {
    color:  #fff176;
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
`;
