import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Search from "./routes/Search";
import History from "./routes/History";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-color: rgb(245, 245, 245);

  @media (min-width: 768px) {
    width: 90%;
    height: 90%;
    border-radius: 12px;
  }
  @media (min-width: 1024px) {
    width: 80%;
    height: 80%;
  }
`;

const NavTabs = styled(Tabs)`
  width: 100%;
  padding-left: 5px;
  background-color: lightgray;
`;

function App() {
  let location = useLocation();
  let tabValue = location.pathname === "/history" ? 1 : 0;

  return (
    <Wrapper>
      <ContentWrapper>
        <NavTabs value={tabValue} aria-label="navigation tabs">
          <Tab label="Search" component={Link} to="search" />
          <Tab label="History" component={Link} to="history" />
        </NavTabs>
        <Routes>
          <Route path="search" element={<Search />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Navigate to="search" />} />
        </Routes>
      </ContentWrapper>
    </Wrapper>
  );
}

export default App;
