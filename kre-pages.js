import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 100 },
    { duration: "3m", target: 100 },
    { duration: "1m", target: 0 },
  ]
};

export default function main() {
  let response;

  response = http.get("http://35.192.147.22:3000/kre-pages", {
    headers: {
      Environment: "env-3",
      "Accept-Language": "en-GB",
      Venture: "virgingames",
      Platform: "desktop",
      Partner: "false",
    },
  });

  // Automatically added sleep
  //sleep(1);
}
