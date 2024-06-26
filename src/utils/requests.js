export default function request(pathname, method, data) {
  return fetch(`http://localhost:4050/api/${pathname}`, {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}
