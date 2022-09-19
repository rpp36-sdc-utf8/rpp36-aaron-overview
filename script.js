import http from 'k6/http';
import { check , sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 15 }, // below normal load
    // { duration: '15s', target: 150 },
    // { duration: '15s', target: 1500},
    // { duration: '15s', target: 15000},
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3010'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/products/71701`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/products/71708/styles`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });

  sleep(1);
}
