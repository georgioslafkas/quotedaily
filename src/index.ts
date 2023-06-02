import { getRandomQuote } from "./quotedaily.resource";
import { initializeApp } from "../node_modules/@firebase/app";
import { getAnalytics } from "../node_modules/@firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA2UTUsENZYy-Unuf7TirzcfPmDRsQJ93w",
  authDomain: "quotedaily-9e1c2.firebaseapp.com",
  projectId: "quotedaily-9e1c2",
  storageBucket: "quotedaily-9e1c2.appspot.com",
  messagingSenderId: "101258276527",
  appId: "1:101258276527:web:360036948e09101fffee5a",
  measurementId: "G-0366EZJ1MW",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
    quoteElement.innerText = `"${content}"`;
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
  dateElement.innerText = `${day} ${date}`;
};

printQuote();
printDate();
