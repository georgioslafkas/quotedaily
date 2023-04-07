type RandomQuoteParams = {
  maxLength?: number;
  minLength?: number;
  tags?: string;
  author?: string;
  authorId?: string;
};

type Params = RandomQuoteParams;

const BASE_URL = "https://api.quotable.io";
const ENDPOINTS = {
  RANDOM: "random",
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
