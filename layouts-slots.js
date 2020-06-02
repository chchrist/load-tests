import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
const failureRate = new Rate('check_failure_rate');
export const options = {
    stages: [
        { target: 20, duration: '30s' },
        { target: 20, duration: '1m' },
        { target: 0, duration: '30s' },
      ],
  thresholds: {
    'failed requests': ['rate<0.1'], // threshold on a custom metric
    'http_req_duration': ['p(95)<200']  // threshold on a standard metric
  },
};
export default function() {
  const response = http.get('http://10.128.0.26:3000/layouts/slots', {
    headers: {
      Environment: 'release-next',
      'Accept-Language': 'en-GB',
      Platform: 'desktop',
      Partner: false,
      Venture: 'jackpotjoy',
    },
  });
  const checkRes = check(response, {
    'status is 200': r => r.status === 200,
  });
  //failureRate.add(!checkRes);
  // sleep(1);
}
