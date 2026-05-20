import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const params = search.trim() ? { search: search.trim(), limit: 50 } : { limit: 50 };
        const data = await api.get('/api/products', params);
        if (!cancelled) {
          setProducts(data.products);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(loadProducts, search.trim() ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div>
      <h1>Products</h1>

      <label htmlFor="search-input" style={{ display: 'block', marginBottom: '1rem' }}>
        Search
        <input
          id="search-input"
          data-testid="search-input"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          style={{ display: 'block', marginTop: '0.5rem', width: '100%', maxWidth: '400px' }}
        />
      </label>

      {loading && <p>Loading products...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              data-testid="product-card"
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <h2 data-testid="product-name" style={{ fontSize: '1.1rem', margin: '0.75rem 0 0.25rem' }}>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h2>
              <p data-testid="product-price" style={{ margin: '0.25rem 0' }}>
                ${Number(product.price).toFixed(2)}
              </p>
              <p style={{ margin: '0.25rem 0', color: '#555' }}>
                {product.category_name || 'Uncategorized'}
              </p>
              <Link to={`/products/${product.id}`}>View details</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
