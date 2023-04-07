"use  strict";

import { getRandomQuote } from "./quotedaily.resource.js";

const printQuote = async () => {
  const res = await getRandomQuote();
  if (res.ok) {
    const quote = await res.json();
    document.getElementById("quote").innerText = quote.content;
  }
};

printQuote();
