import { getQuoteById, getRandomQuote } from "./quotedaily.resource";
import { getQuoteFromCookies, isToday, setQuoteInCookies } from "./util";

type GetDateProps = {
  locale?: string;
  options?: any;
};

const getDateFormat = ({ locale, options }: GetDateProps) =>
  new Intl.DateTimeFormat(locale, options);

const quoteElement = document.getElementById("quote") as HTMLElement;
const authorElement = document.getElementById("author") as HTMLElement;
const dateElement = document.getElementById("date") as HTMLElement;

const getQuote = async () => {
  try {
    const existingQuoteId = getQuoteFromCookies().id;
    const res = shouldGetNewQuote()
      ? await getRandomQuote()
      : await getQuoteById(existingQuoteId);
    if (res.ok) {
      const quote = await res.json();
      setQuoteInCookies({
        date: new Date().toLocaleDateString("sv"),
        id: quote._id,
      });
      return quote;
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
    quoteElement.innerText = `"${content}"`;
    authorElement.innerText = `- ${author}`;
  } catch {
    quoteElement.innerText =
      "Sometimes things break. This is not a daily quote, our service is just facing problems right now. Reload and if the problem persists, come back tomorrow.";
    quoteElement.innerText = "- Quotedaily";
  }
};

const shouldGetNewQuote = () => {
  const quote = getQuoteFromCookies();
  if (!quote?.id || !isToday(quote.date)) {
    return true;
  }

  return false;
};

const printDate = () => {
  const today = new Date();
  const day = getDateFormat({ options: { weekday: "long" } }).format(today);
  const date = getDateFormat({}).format(today);
  dateElement.innerText = `${day} ${date}`;
};

printQuote();
printDate();
