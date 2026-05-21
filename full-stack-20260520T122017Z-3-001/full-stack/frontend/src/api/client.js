/**
 * API client utility — PROVIDED.
 * You do NOT need to modify this file.
 *
 * Usage:
 *   import api from '../api/client';
 *
 *   // GET request
 *   const data = await api.get('/api/products');
 *
 *   // GET with query params
 *   const data = await api.get('/api/products', { search: 'headphones', page: 1 });
 *
 *   // POST request
 *   const data = await api.post('/api/products', { name: 'New Product', price: 10 });
 *
 *   // PUT request
 *   const data = await api.put('/api/products/1', { name: 'Updated Name' });
 *
 *   // DELETE request
 *   await api.del('/api/products/1');
 */

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(method, path, body = null, params = null) {
  let url = `${BASE_URL}${path}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

const api = {
  get: (path, params) => request('GET', path, null, params),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  del: (path) => request('DELETE', path),
};

export default api;
