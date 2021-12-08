import React from "react";
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/Comment";
import Hit from "../models/hit";

const formatDate = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const Wrapper = styled.div`
  width: 82%;
  border-radius: 12px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  padding: 5px 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const CommentWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;

const HitItem: React.FC<Hit> = (props) => {
  const { title, author, num_comments, created_at_i } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <div>By: {author}</div>
      <div>{formatDate.format(new Date(created_at_i * 1000))}</div>
      <CommentWrapper>
        <CommentIcon sx={{ marginRight: "2px" }} />
        {num_comments}
      </CommentWrapper>
    </Wrapper>
  );
};

export default HitItem;
