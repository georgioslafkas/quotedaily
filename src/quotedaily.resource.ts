type RandomQuoteParams = {
  maxLength?: number;
  minLength?: number;
  tags?: string;
  author?: string;
  authorId?: string;
};

const BASE_URL = "https://api.quotable.io";
const ENDPOINTS = {
  RANDOM: "random",
  BY_ID: "quotes",
};
const OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const appendParams = (params?: RandomQuoteParams) => {
  if (!params || Object.entries(params).length === 0) {
    return;
  }
  return Object.entries(params).reduce(
    (paramString, param) => (paramString += `&${param[0]}=${param[1]}`),
    "?"
  );
};

const buildRequest = (url: string, params?: RandomQuoteParams) =>
  new Request(`${url}${params ? appendParams(params) : ""}`, OPTIONS);

export const getRandomQuote = (params?: RandomQuoteParams) =>
  fetch(buildRequest(`${BASE_URL}/${ENDPOINTS.RANDOM}`, params));

export const getQuoteById = (id: string) =>
  fetch(new Request(`${BASE_URL}/${ENDPOINTS.BY_ID}/${id}`), OPTIONS);
