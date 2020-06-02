import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
const failureRate = new Rate('check_failure_rate');
export const options = {
    stages: [
        { target: 50, duration: '30s' },
        { target: 50, duration: '1m' },
        { target: 0, duration: '30s' },
      ],
  thresholds: {
    'failed requests': ['rate<0.1'], // threshold on a custom metric
    'http_req_duration': ['p(95)<200']  // threshold on a standard metric
  },
};
export default function() {
  const responseSlots = http.get('http://10.128.0.26:3000/layouts/slots', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
    const responseCasino = http.get('http://10.128.0.26:3000/layouts/casino', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
    const responseBingo = http.get('http://10.128.0.26:3000/layouts/bingo', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
    const responseHomepage = http.get('http://10.128.0.26:3000/layouts/homepage', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
    const responseJackpots = http.get('http://10.128.0.26:3000/layouts/jackpots', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
//   const checkRes = check(response, {
//     'status is 200': r => r.status === 200,
//   });
  //failureRate.add(!checkRes);
  // sleep(1);
}
