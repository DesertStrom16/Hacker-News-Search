import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { querySearch } from "../helper/API";
import { fetchNews } from "../store/data/dataSlice";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import HitItem from "../components/HitItem";

type InputChange = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  overflow-y: auto;
`;

const TextInput = styled(TextField)`
  width: 400px;
`;

const Results = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`;

const Pageinate = styled.div`
  width: 220px;
  height: 70px;
  border-radius: 35px;
  margin-bottom: 12px;
  background-color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const PageButton = styled(Button)`
  border: 0px;
  outline: 0px;
  background-color: transparent;
  width: 40%;
  height: 100%;
`;

const PageCount = styled.div`
  width: 20%;
  height: 100%;
  font-size: 24px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

let timer: any;

const Search: React.FC<{}> = (props) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { hits, page, query, nbPages } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    debounce();
  }, [input]);

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch();
    }, 300);
  };

  const handleChange = (e: InputChange) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    if (input.trim() !== "") {
      setLoading(true);
      await querySearch(input, 0)
        .then((data) => {
          if (data.hits && data.hits.length > 0) {
            dispatch(fetchNews(data));
          }
        })
        .catch((err) => console.log(err));
      setLoading(false);
    }
  };

  const handlePaginate = async (next: boolean) => {
    setLoading(true);
    await querySearch(query, next ? page + 1 : page - 1)
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          dispatch(fetchNews(data));
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  return (
    <Wrapper>
      <TextInput
        value={input}
        onChange={handleChange}
        label="Search News"
        variant="standard"
      />

      <Results>
        {loading ? (
          <CircularProgress />
        ) : hits.length > 0 ? (
          <>
            {hits.map((hit) => (
              <HitItem key={hit.objectID} {...hit} />
            ))}
            <Pageinate>
              <PageButton
                sx={{ color: "white" }}
                disabled={page === 0}
                onClick={() => handlePaginate(false)}
              >
                <ArrowBackIcon fontSize="large" />
              </PageButton>
              <PageCount>{page}</PageCount>
              <PageButton
                sx={{ color: "white" }}
                disabled={page === nbPages - 1}
                onClick={() => handlePaginate(true)}
              >
                <ArrowForwardIcon fontSize="large" />
              </PageButton>
            </Pageinate>
          </>
        ) : null}
      </Results>
    </Wrapper>
  );
};

export default Search;
