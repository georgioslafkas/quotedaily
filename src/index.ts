import { getRandomQuote } from "./quotedaily.resource";

const printQuote = async () => {
  const res = await getRandomQuote();
  if (res.ok) {
    const quote = await res.json();
    const element = document.getElementById("quote");
    if (element) {
      element.innerText = quote.content;
    }
  }
};

printQuote();
