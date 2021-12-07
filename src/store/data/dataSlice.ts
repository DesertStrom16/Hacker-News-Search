import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HitResult from "../../models/hitResults";

const initialState: HitResult = {
  hits: [],
  nbPages: 0,
  page: 0,
  query: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchNews: (state, action: PayloadAction<HitResult>) => {
      state.hits = action.payload.hits;
      state.nbPages = action.payload.nbPages;
      state.page = action.payload.page;
      state.query = action.payload.query;
    },
  },
});

export const { fetchNews } = dataSlice.actions;

export default dataSlice.reducer;
