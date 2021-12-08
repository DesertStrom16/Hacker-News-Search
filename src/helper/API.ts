export const querySearch = async (query: string, page: number) => {
  return await fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
  ).then((res) => res.json());
};
