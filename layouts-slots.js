import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
const failureRate = new Rate('check_failure_rate');
export const options = {
    stages: [
        { target: 10, duration: '1m' },
        { target: 10, duration: '3m' },
        { target: 0, duration: '1m' },
      ],
  thresholds: {
    
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
