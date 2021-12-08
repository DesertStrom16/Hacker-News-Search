import { useAppSelector } from "../app/hooks";
import styled from "styled-components";
import HistoryItem from "../components/HistoryItem";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`;

const Header = styled.div`
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid gray;
  margin-bottom: 15px;
  display: flex;
`;

const Title = styled.div`
  width: 35%;
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
