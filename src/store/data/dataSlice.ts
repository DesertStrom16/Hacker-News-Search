import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HitResult from "../../models/hitResults";
import Search from "../../models/search";

type DataState = HitResult & { searchHistory: Search[] };
type NewsState = HitResult & { isSearch: boolean };

const initialState: DataState = {
  hits: [],
  nbPages: 0,
  page: 0,
  query: "",
  searchHistory: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchNews: (state, action: PayloadAction<NewsState>) => {
      if (action.payload.isSearch) {
        state.searchHistory.push({
          term: action.payload.query,
          timestamp: Date.now(),
        });
      }
      state.hits = action.payload.hits;
      state.nbPages = action.payload.nbPages;
      state.page = action.payload.page;
      state.query = action.payload.query;
    },
    clearNews: (state) => {
      state.hits = [];
      state.nbPages = 0;
      state.page = 0;
      state.query = "";
    },
  },
});

export const { fetchNews, clearNews } = dataSlice.actions;

export default dataSlice.reducer;
