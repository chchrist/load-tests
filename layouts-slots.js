import http from 'k6/http';
import { sleep } from 'k6';

let httpOptions = {
  headers: {
    Environment: 'release-next',
    'Accept-Language': 'en-GB',
    Venture: 'starspins',
    Platform: 'desktop',
    Partner: 'false',
    Native: 'false',
  },
};

export const options = {
  stages: [
    { target: 100, duration: '1m' },
    { target: 100, duration: '3m' },
    { target: 0, duration: '1m' },
  ],
  thresholds: {
    http_req_duration: ['p(95)<100'],
    check_failure_rate: [
      'rate<0.01',
      { threshold: 'rate<=0.1', abortOnFail: true },
    ],
  },
};

let url = "http://10.128.0.26:3000";

export default function () {
  let userDistro = Math.floor(Math.random() * 100);

  switch (true) {
    case userDistro <= 88:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/homepage', null, httpOptions],
      ]);

      break;
      case userDistro > 88 && userDistro <= 93:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/slots', null, httpOptions],
      ]);
      break;
    case userDistro > 93 && userDistro <= 96:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/bingo', null, httpOptions],
      ]);
      break;
    case userDistro > 96 && userDistro < 98:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/free', null, httpOptions],
      ]);
      break;
    case userDistro > 98 && userDistro < 99:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/poker', null, httpOptions],
        ['GET', url+'/layouts/jackpots', null, httpOptions],
      ]);
      break;
    case userDistro > 99 && userDistro < 100:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/casino', null, httpOptions],
        ['GET', url+'/layouts/live-casino', null, httpOptions],
      ]);
      break;
    default:
      http.batch([
        ['GET', url+'/categories', null, httpOptions],
        ['GET', url+'/layouts/new', null, httpOptions],
      ]);
      break;
  }
}
