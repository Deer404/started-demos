export const CLIENT_ID = "YOUR_CLIENT_ID";
export const fetcher = (url: string, ...args: any[]) =>
  fetch(url, ...args).then((r) => r.json());
