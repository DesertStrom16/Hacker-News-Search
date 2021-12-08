import { useAppSelector } from "../app/hooks";
import styled from "styled-components";
import HistoryItem from "../components/HistoryItem";

const Wrapper = styled.div`
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`;

const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid gray;
  margin-bottom: 15px;
  display: flex;

  @media (min-width: 768px) {
    padding-left: 10px;
  }
`;

const Title = styled.div`
  width: 50%;

  @media (min-width: 515px) {
    width: 52%;
  }

  @media (min-width: 575px) {
    width: 55%;
  }

  @media (min-width: 768px) {
    width: 35%;
  }
`;

const DateText = styled.div`
  margin-left: 10px;
`;

const NoHistoryMsg = styled.div`
  color: gray;
`;

const History = () => {
  const { searchHistory } = useAppSelector((state) => state.data);

  return (
    <Wrapper>
      <Header>
        <Title>Search Term</Title>
        <DateText>Date</DateText>
      </Header>
      {searchHistory.length > 0 ? (
        [...searchHistory].reverse().map((search) => {
          return <HistoryItem key={search.timestamp} {...search} />;
        })
      ) : (
        <NoHistoryMsg>No search history found</NoHistoryMsg>
      )}
    </Wrapper>
  );
};

export default History;
