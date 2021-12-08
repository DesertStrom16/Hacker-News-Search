import { useAppSelector } from "../app/hooks";
import styled from "styled-components";
import HistoryItem from "../components/HistoryItem";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  overflow-y: auto;
`;

const OverflowWrapper = styled.div`
  width: 85%;
  max-width: 800px;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid gray;
  margin-bottom: 15px;
  display: flex;
  padding: 0px 14px 0px 6px;
`;

const Title = styled.div`
  width: 35%;

  @media (min-width: 768px) {
    width: 45%;
  }
`;

const DateTitle = styled.div`
  margin-left: 10px;
`;

const NoHistoryMsg = styled.div`
  color: gray;
`;

const History = () => {
  const { searchHistory } = useAppSelector((state) => state.data);

  return (
    <Wrapper>
      <OverflowWrapper>
        <Header>
          <Title>Search</Title>
          <DateTitle>Date</DateTitle>
        </Header>
        {searchHistory.length > 0 ? (
          [...searchHistory].reverse().map((search) => {
            return <HistoryItem key={search.timestamp} {...search} />;
          })
        ) : (
          <NoHistoryMsg>No search history found</NoHistoryMsg>
        )}
      </OverflowWrapper>
    </Wrapper>
  );
};

export default History;
