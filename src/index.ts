import { getRandomQuote } from "./quotedaily.resource";

type GetDateProps = {
  locale?: string;
  options?: any;
};

const getDateFormat = ({ locale, options }: GetDateProps) =>
  new Intl.DateTimeFormat(locale, options);

const quoteElement = document.getElementById("quote") as HTMLElement;
const authorElement = document.getElementById("author") as HTMLElement;
const dayElement = document.getElementById("day") as HTMLElement;
const dateElement = document.getElementById("date") as HTMLElement;

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

const printDate = () => {
  const today = new Date();
  const day = getDateFormat({ options: { weekday: "long" } }).format(today);
  const date = getDateFormat({}).format(today);
  dayElement.innerText = day;
  dateElement.innerText = date;
};

printQuote();
printDate();
