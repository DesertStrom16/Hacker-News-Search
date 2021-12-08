import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { querySearch } from "../helper/API";
import {
  fetchNews,
  emptyFetchResult,
  clearNews,
} from "../store/data/dataSlice";
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
  width: 82%;
  max-width: 400px;
`;

const Results = styled.div`
  width: 100%;
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

const NoResults = styled.div`
  color: gray;
`;

let timer: any;

const Search = () => {
  const { hits, page, query, nbPages } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState(query || "");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(
    query && hits.length <= 0 ? true : false
  );
  const isInitialMountRef = useRef(true);
  const errorRef = useRef(false);
  const removeErrorRef = useRef(false);

  useEffect(() => {
    // Debounce input
    clearTimeout(timer);
    timer = setTimeout(async () => {
      // If initial mount, set ref to false
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
      }
      // Otherwise, fetch query from HN API
      else {
        // Check for empty input
        if (input.trim() !== "") {
          setLoading(true);

          // Fetch page 1
          await querySearch(input, 0)
            .then((data) => {
              if (data.hits && data.hits.length > 0) {
                dispatch(fetchNews({ ...data, isSearch: true }));
                setNoResults(false);
              } else {
                dispatch(emptyFetchResult({ query: input }));
                setNoResults(true);
              }
            })
            .catch(() => {
              // Clear previous results on error
              dispatch(clearNews());
              setNoResults(false);
              errorRef.current = true;
            });

          setLoading(false);
        }
      }
    }, 350);
  }, [input, dispatch]);

  const handleChange = (e: InputChange) => {
    setInput(e.target.value);
  };

  const handlePaginate = async (next: boolean) => {
    setLoading(true);

    // Add or subtract a page accordingly
    await querySearch(query, next ? page + 1 : page - 1)
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          dispatch(fetchNews(data));
        }
      })
      .catch(() => {
        // Clear previous results on error
        dispatch(clearNews());
        errorRef.current = true;
      });
    setLoading(false);
  };

  // Error tracking across renders
  if (errorRef.current) {
    if (removeErrorRef.current) {
      errorRef.current = false;
      removeErrorRef.current = false;
    } else {
      removeErrorRef.current = true;
    }
  }

  return (
    <Wrapper>
      <TextInput
        value={input}
        onChange={handleChange}
        label="Search News"
        variant="standard"
        error={errorRef.current}
        helperText={
          errorRef.current
            ? "Oops, something went wrong. Please try again."
            : ""
        }
      />

      <Results>
        {loading ? (
          <CircularProgress />
        ) : hits.length > 0 && !errorRef.current ? (
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
              <PageCount>{page + 1}</PageCount>
              <PageButton
                sx={{ color: "white" }}
                disabled={page === nbPages - 1}
                onClick={() => handlePaginate(true)}
              >
                <ArrowForwardIcon fontSize="large" />
              </PageButton>
            </Pageinate>
          </>
        ) : noResults ? (
          <NoResults>No results found</NoResults>
        ) : null}
      </Results>
    </Wrapper>
  );
};

export default Search;
