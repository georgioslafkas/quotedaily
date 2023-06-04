type Quote = {
  date: string;
  id: string;
};
export const getQuoteFromCookies = (): Quote =>
  JSON.parse(
    Object.fromEntries(
      document.cookie
        .split("; ")
        .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
    )?.quote || "{}"
  );

export const setQuoteInCookies = (quote: Quote) => {
  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie =
    "quote=" + JSON.stringify(quote) + "; " + expires + "; path=/";
};

export const isToday = (date: string): boolean =>
  date === new Date().toLocaleDateString("sv");
