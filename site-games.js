import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
const failureRate = new Rate('check_failure_rate');
export const options = {
  stages: [
    { target: 50, duration: '2m' },
  ],
  thresholds: {
    http_req_duration: ['p(95)<100'],
    check_failure_rate: [
      'rate<0.01',
      { threshold: 'rate<=0.1', abortOnFail: true },
    ],
  },
};
export default function() {
  const response = http.get('http://35.193.240.177:3000/site-games/play-double-bubble', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Venture: 'jackpotjoy',
    },
  });
  const checkRes = check(response, {
    'status is 200': r => r.status === 200,
  });
  failureRate.add(!checkRes);
  sleep(1);
}