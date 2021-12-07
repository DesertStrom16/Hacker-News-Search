import React from "react";
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/Comment";
import Hit from "../models/hit";

const Wrapper = styled.div`
  width: 84%;
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
  const { title, author, num_comments } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <div>By: {author}</div>
      <CommentWrapper>
        <CommentIcon sx={{ marginRight: "2px" }} />
        {num_comments}
      </CommentWrapper>
    </Wrapper>
  );
};

export default HitItem;
