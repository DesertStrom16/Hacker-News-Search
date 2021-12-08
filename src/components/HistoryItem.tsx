import React from "react";
import styled from "styled-components";
import Search from "../models/search";

const formatDate = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "numeric",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const Wrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  padding: 5px 0px 5px 10px;
  box-sizing: border-box;
`;

const Title = styled.div`
  overflow: hidden;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 35%;
  padding-left: 4px;
  box-sizing: border-box;
`;

const SearchDate = styled.div`
  margin-left: 14px;
`;

const HistoryItem: React.FC<Search> = (props) => {
  const { term, timestamp } = props;
  return (
    <Wrapper>
      <Title>{term}</Title>
      <SearchDate>{formatDate.format(new Date(timestamp))}</SearchDate>
    </Wrapper>
  );
};

export default HistoryItem;
