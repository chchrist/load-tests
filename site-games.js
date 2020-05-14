import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 100 },
    { duration: "3m", target: 100 },
    { duration: "1m", target: 0 }
  ]
};

export default function() {
  let response;

  response = http.get(
    "http://35.193.240.177:3000/site-games/play-double-bubble",
    {
      headers: {
        Environment: "release-next",
        Venture: "virgingames",
        "Accept-Language": "en-GB"
      }
    }
  );

  sleep(1);
}
