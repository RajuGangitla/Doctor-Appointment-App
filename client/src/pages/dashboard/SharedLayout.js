import styled from "styled-components";
import { Outlet } from "react-router-dom";
import BigSidebar from "../../components/BigSidebar";
import Navbar from "./../../components/Navbar";
import SmallSideBar from "../../components/SmallSideBar";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <SmallSideBar/>
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;

const Wrapper = styled.main`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
