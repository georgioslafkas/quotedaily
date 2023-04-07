import { getRandomQuote } from "./quotedaily.resource";

const quoteElement = document.getElementById("quote") as HTMLElement;
const authorElement = document.getElementById("author") as HTMLElement;

const getQuote = async () => {
  try {
    const res = await getRandomQuote();
    if (res.ok) {
      return await res.json();
    } else {
      throw Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
  }
};

const printQuote = async () => {
  try {
    const { author, content } = await getQuote();
    quoteElement.innerText = content;
    authorElement.innerText = `- ${author}`;
  } catch {
    quoteElement.innerText =
      "Sometimes things break. This is not a daily quote, our service is just facing problems right now. Reload and if the problem persists, come back tomorrow.";
    quoteElement.innerText = "- Quotedaily";
  }
};

printQuote();
